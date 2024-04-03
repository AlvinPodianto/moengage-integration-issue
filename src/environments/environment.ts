// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare var require: any

export const environment = {
  production: true,
  showMaintainancePage: false,

  coreServiceApiUrlV1: 'https://staging-mobile-api.securerx.id/v1',
  coreServiceApiUrlV2: 'https://staging-mobile-api.securerx.id/v2',

  partnerServiceApiUrl: 'https://dev-partnership.securerx.id/v1',

  waMessagingUrl: 'https://wa.me', 
  appUrlWww:'https://staging-farmaku.securerx.id',
  appUrl:'https://staging-farmaku.securerx.id',
  appName:'Farmaku',

  googleClientId : '797917871938-oh5sqfum8es83bok6hipkkjcimidph10.apps.googleusercontent.com',
  facebookClientId : '772795830133800',

  firebase: {
		apiKey: "AIzaSyCTM2IY-6xdlH9TRiA-dMTF05kF2teUjCw",
		authDomain: "rx-e503f.firebaseapp.com",
		databaseURL: "https://rx-e503f.firebaseio.com",
		projectId: "rx-e503f",
		storageBucket: "rx-e503f.appspot.com",
		messagingSenderId: "797917871938",
		appId: "1:797917871938:web:ae0707801b92b8ce60d2db",
		measurementId: "G-6QGC453ZHZ"
	},

  googleMapsKey:'AIzaSyBsPm2x8gArZIPPabjlFGQMMgPOtzRQiiM',
  googleMapsApiUrl:'https://maps.googleapis.com/maps/api',
 
  LinkPreviewKey:'b2899b4c924a0c1ea76d4d57b2eeaf45',

  onesignalAppId:'8aa54f63-38d8-44f6-b351-1c80d5cdf8d1',
	partnertParentOrigin:["https://health.eggaddict.com/kesehatan", "https://health.eggaddict.com/","http://localhost:8100/","https://www-rc.web.tvlk.dev/id-id/health/partner/farmaku/","https://health.eggaddict.com","http://localhost:8100","https://www-rc.web.tvlk.dev/id-id/health/partner/farmaku", "http://m-pr17365.web.tvlk.dev", "http://m-pr17365.web.tvlk.dev/"],
  excludePartnerUrl:"https://partner-farmaku.eggaddict.com",
  partnerTrackingUrl: "https://m-rc.web.tvlk.dev",
  
  version: require('../../package.json').version,
  versionCheckURL: 'http://localhost:8000/version.json',
  // hubURL: 'https://hub.eggaddict.com/hubs/notify'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
