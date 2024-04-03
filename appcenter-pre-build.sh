#!/usr/bin/env bash
#Run to install cordova and ionic
echo "Begin install cordova and ionic"
npm install -g cordova ionic

#Run to genetate assets
echo "Begin sync android"
ionic cap sync android --prod

#Run to generate folder 
echo "Begin Generating Folder capacitor-cordova-android-plugins"
npx cap update android