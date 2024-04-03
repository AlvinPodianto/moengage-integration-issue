import { defineConfig } from 'cypress'

export default {
  projectId: "nbpkpj",
  env: {
    googleClientId: '797917871938-oh5sqfum8es83bok6hipkkjcimidph10.apps.googleusercontent.com',
    googleClientSecret: 'beAplOjtWuggQSiWy-Z6olxY',

    // To Get Refresh Token Follow  https://docs.cypress.io/guides/end-to-end-testing/google-authentication
    googleRefreshToken: '1//04uHHgO7Yk4TMCgYIARAAGAQSNwF-L9IrEAc_zAKHE6gHcn-7JKkv1DqsLm8p3usLRasiy6i4cOqFOsRf_62QudO2exliLL9z-5c'
  },
  e2e: {
    setupNodeEvents(on, config) {
      return {
        baseUrl: "https://staging-farmaku.securerx.id",
        browsers: config.browsers.filter(
          (browser) => browser.name !== "electron"
        ),
        chromeWebSecurity: false,
        viewportHeight: 896,
        viewportWidth: 414,
      };
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
};

defineConfig({
  env: {
    
  }
})
