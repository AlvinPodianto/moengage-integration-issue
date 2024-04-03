declare var require: any

export const environment = {
	production: true,
	showMaintainancePage: false,

	coreServiceApiUrlV1: 'https://staging-mobile-api.securerx.id/v1',
	coreServiceApiUrlV2: 'https://staging-mobile-api.securerx.id/v2',

	partnerServiceApiUrl: 'https://dev-partnership.securerx.id/v1',

	waMessagingUrl: 'https://wa.me',
	appUrlWww: 'https://staging-farmaku.securerx.id',
	appUrl: 'https://staging-farmaku.securerx.id',
	appName: 'Farmaku-Staging',

	googleClientId: '797917871938-oh5sqfum8es83bok6hipkkjcimidph10.apps.googleusercontent.com',
	facebookClientId: '772795830133800',

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

	onesignalAppId: '8aa54f63-38d8-44f6-b351-1c80d5cdf8d1',
	partnertParentOrigin: [
		"https://staging-health.securerx.id",
		"https://staging-health.securerx.id/",
		"http://localhost:8100", 
		"http://localhost:8100/",
		"https://m-rc.web.tvlk.dev",
		"https://m-rc.web.tvlk.dev/",
		"http://m-pr17365.web.tvlk.dev",
		"http://m-pr17365.web.tvlk.dev/"
	],
	excludePartnerUrl:"https://staging-partner-farmaku.securerx.id",
	partnerTrackingUrl: "https://m-rc.web.tvlk.dev",
	
	googleMapsKey: 'AIzaSyBsPm2x8gArZIPPabjlFGQMMgPOtzRQiiM',
	googleMapsApiUrl: 'https://maps.googleapis.com/maps/api',
	
	LinkPreviewKey:'b2899b4c924a0c1ea76d4d57b2eeaf45',

	version: require('../../package.json').version,
	versionCheckURL: 'https://staging-farmaku.securerx.id/version.json'
};