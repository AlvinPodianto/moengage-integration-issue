declare var require: any

export const environment = {
	production: true,
	showMaintainancePage: false,

	coreServiceApiUrlV1: 'https://test-mobile-api.farmaku.com/v1',
	coreServiceApiUrlV2: 'https://test-mobile-api.farmaku.com/v2',
	waMessagingUrl: 'https://wa.me',
	appUrlWww: 'https://www.farmaku.com',
	appUrl: 'https://www.farmaku.com',
	appName: 'Farmaku-Test',

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

	googleMapsKey: 'AIzaSyBsPm2x8gArZIPPabjlFGQMMgPOtzRQiiM',
	googleMapsApiUrl: 'https://maps.googleapis.com/maps/api',

	version: require('../../package.json').version,
	versionCheckURL: 'https://test-ui.farmaku.com/version.json'
};