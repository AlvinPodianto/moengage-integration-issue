declare var require: any

export const environment = {
	production: true,
	showMaintainancePage: false,

	coreServiceApiUrlV1: 'https://mobile-api.farmaku.com/v1',
	coreServiceApiUrlV2: 'https://mobile-api.farmaku.com/v2',

	partnerServiceApiUrl: 'https://partner-api.farmaku.com/v1',

	waMessagingUrl: 'https://wa.me',
	appUrlWww: 'https://www.farmaku.com',
	appUrl: 'https://www.farmaku.com',
	appName: 'Farmaku',

	googleClientId: '797917871938-oh5sqfum8es83bok6hipkkjcimidph10.apps.googleusercontent.com',
	facebookClientId: '1554037634719249',

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

	onesignalAppId: '2f7669ed-b5d4-4556-80d6-eaa5b6d04260',
	partnertParentOrigin: [
		"https://m.traveloka.com",
		"https://m.traveloka.com/"
	],
	excludePartnerUrl: "https://partner.farmaku.com",
	partnerTrackingUrl: "https://m.traveloka.com",

	googleMapsKey: 'AIzaSyBsPm2x8gArZIPPabjlFGQMMgPOtzRQiiM',
	googleMapsApiUrl: 'https://maps.googleapis.com/maps/api',
	
	LinkPreviewKey:'b2899b4c924a0c1ea76d4d57b2eeaf45',

	version: require('../../package.json').version,
	versionCheckURL: 'https://www.farmaku.com/version.json'
};