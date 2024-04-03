const path = require('path');
const fs = require('fs');
const util = require('util');
const https = require('https');

// get application version from package.json
const appVersion = require('../package.json').version;

// promisify core API's
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

console.log('\nRunning post-build tasks');

// our version.json will be in the www folder
const environment = process.argv.slice(3)[0];
const versionFilePath = path.join(__dirname + '/../www/version.json');
const redirectionFilePath = path.join(__dirname + '/../nginx.config');

let mainHash = '';
let mainBundleFile = '';

// RegExp to find main.bundle.js, even if it doesn't include a hash in it's name (dev build)
let mainBundleRegexp = /^main.?([a-z0-9.]*)?(\.bundle)?.js$/;

// read the www folder files and find the one we're looking for
readDir(path.join(__dirname, '../www/'))
    .then(files => {
        mainBundleFile = files.find(f => mainBundleRegexp.test(f));

        if (mainBundleFile) {
            let matchHash = mainBundleFile.match(mainBundleRegexp);

            // if it has a hash in it's name, mark it down
            if (matchHash.length > 1 && !!matchHash[1]) {
                mainHash = matchHash[1];
                console.log("Hash : " + mainHash);
            }
        }

        console.log(`Writing version and hash to ${versionFilePath}`);

        // write current version and hash into the version.json file
        const src = `{"version": "${appVersion}", "hash": "${mainHash}"}`;
        return writeFile(versionFilePath, src);
    })
    .then(() => {
        // main bundle file not found, dev build?
        if (!mainBundleFile) {
            return;
        }

        console.log(`Replacing hash in the ${mainBundleFile}`);

        // replace hash placeholder in our main.js file so the code knows it's current hash
        const mainFilepath = path.join(__dirname, '../www/', mainBundleFile);
        return readFile(mainFilepath, 'utf8')
            .then(mainFileData => {
                const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
                return writeFile(mainFilepath, replacedFile);
            });
    })
    .catch(err => {
        console.log('Error with post build:', err);
    });

//const environment = process.argv.slice(3)[0];
const prefix = environment === 'production'
    ? "https://mobile-api.farmaku.com/v2"
    : "https://staging-mobile-api.securerx.id/v2";
const postfix = '/Info/UrlRedirections';

https.get(prefix + postfix, res => {
    let data = ''

    // called when a data chunk is received.
    res.on('data', chunk => {
        data += chunk
    })

    // called when the complete response is received.
    res.on('end', () => {
        let parsedData = JSON.parse(data)
        let nginxConfig = '';

        fs.readFile(redirectionFilePath, (err, data) => {
            if (err) 
                throw err;

            nginxConfig = data.toString();

            let location = '';
            parsedData.forEach(element => {
                location += `location /${element.from} { return 301 /${element.to}; } \n  `;
            });

            nginxConfig = nginxConfig.replace('$URL_REDIRECTION_CONFIG', location);

            return writeFile(redirectionFilePath, nginxConfig);
        });
    })
})
    .on('error', err => {
        console.log('Error: ', err.message)
    })