importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/9.0.0/firebase-app-compat.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/9.0.0/firebase-messaging-compat.min.js');
importScripts("https://cdn.moengage.com/release/dc_1/serviceworker_cdn.min.latest.js");

firebase.initializeApp({
  apiKey: "AIzaSyCTM2IY-6xdlH9TRiA-dMTF05kF2teUjCw",
  authDomain: "rx-e503f.firebaseapp.com",
  databaseURL: "https://rx-e503f.firebaseio.com",
  projectId: "rx-e503f",
  storageBucket: "rx-e503f.appspot.com",
  messagingSenderId: "797917871938",
  appId: "1:797917871938:web:ae0707801b92b8ce60d2db",
  measurementId: "G-6QGC453ZHZ"
});

const messaging = firebase.messaging();