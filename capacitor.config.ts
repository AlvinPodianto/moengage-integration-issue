import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const base: CapacitorConfig = {
  appId: 'com.farmaku.app',
  appName: 'Farmaku.UI',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      androidSpinnerStyle: "large",
      showSpinner: true,
      iosSpinnerStyle: "small",
      spinnerColor: "#999999"

    },
    GoogleAuth: {
      scopes: [
        "profile",
        "email"
      ],
      serverClientId: "797917871938-oh5sqfum8es83bok6hipkkjcimidph10.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
};

switch (process.env.NODE_ENV) {
  case 'prd':
    config = {
      ...base,
      android: {
        flavor: 'prd',
      },
    };
    break;

  default:
    config = {
      ...base,
      android: {
        flavor: 'stg',
      },
    };
    break;
}

export default config;
