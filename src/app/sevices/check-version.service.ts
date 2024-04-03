import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CheckVersionService {
  // this will be replaced by actual hash post-build.js
  private currentHash = localStorage.getItem('applicationHashCode');

  constructor(private http: HttpClient) { }

  public initVersionCheck(url, frequency = 1000 * 60 * 3) {
    this.checkVersion(url);

    // this.reloadAble();

    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }

  private checkVersion(url) {
    // timestamp these requests to invalidate caches
    this.http.get(url + '?t=' + new Date().getTime()).subscribe(
      (response: any) => {
        const hash = response.hash;
        const hashChanged = this.hasHashChanged(this.currentHash, hash);

        // If new version, do something
        if (hashChanged) {
          window.location.reload();
        }

        // store the new hash so we wouldn't trigger versionChange again
        localStorage.setItem('applicationHashCode', hash);
      },
      (err) => {
        console.error(err, 'Could not get version');
      }
    );
  }

  private reloadAble(maxDiff = 1000 * 60 * 60 * 24) {
    let lastReloadTime = parseInt(localStorage.getItem('initedTimestamp'));
    let nowTime = new Date().getTime();

    if (lastReloadTime) {
      // console.log(lastReloadTime);
      let timeDiff = nowTime - lastReloadTime;
      if (timeDiff > maxDiff) {
        setTimeout(() => {
          localStorage.setItem('initedTimestamp', nowTime.toString());
          window.location.reload();
        }, 1000);
      }
    }
    else {
      localStorage.setItem('initedTimestamp', nowTime.toString());
    }
  }

  private hasHashChanged(currentHash, newHash) {
    if (currentHash == undefined) {
      return false;
    }

    return currentHash !== newHash;
  }
}