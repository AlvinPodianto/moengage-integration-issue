//tvlk import { Injectable } from '@angular/core';
//tvlk import { isPartner } from 'src/app/helpers/helper';
//tvlk import { environment } from 'src/environments/environment';
//tvlk import { setup, trackBooking, trackConversion, trackInteraction, ConversionTrackingData, BookingTrackingData, InteractionTrackingData } from 'tvlk-farmaku-tracking';
//tvlk @Injectable({
//tvlk   providedIn: 'root'
//tvlk })
//tvlk export class TravelokaService {
//tvlk   isAccessible: boolean = false;
//tvlk 	isPartner:boolean=isPartner();
//tvlk   constructor() { 
//tvlk     if (this.isPartner) {
//tvlk       this.isAccessible = true;
//tvlk     } 
//tvlk     if (this.isAccessible) {
//tvlk       setup({ iframeParentOrigin: environment.partnerTrackingUrl });
//tvlk     }
//tvlk   } 
//tvlk   onTrackConversion(item: 'LANDING' | 'LOGIN' | 'PRESCRIPTION' | 'PRODUCT_DETAIL' | 'BOOKING') {
//tvlk     if (this.isAccessible) {
//tvlk       let payload: ConversionTrackingData = {
//tvlk         pageName: item
//tvlk       };
//tvlk       trackConversion(payload);
//tvlk     } else {
//tvlk       return false;
//tvlk     }
//tvlk   } 
//tvlk   onTrackBooking(params) {
//tvlk     if (this.isAccessible) {
//tvlk       let payload: BookingTrackingData = params;
//tvlk       trackBooking(payload);
//tvlk     } else {
//tvlk       return false;
//tvlk     }
//tvlk   } 
//tvlk   onTrackInteraction(params) {
//tvlk     if (this.isAccessible) {
//tvlk       let payload: InteractionTrackingData = params;
//tvlk       trackInteraction(payload);
//tvlk     } else {
//tvlk       return false;
//tvlk     }
//tvlk   } 
//tvlk }
