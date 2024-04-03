import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CanonicalService {

  constructor(@Inject(DOCUMENT) private dom, private router: ActivatedRoute) { }

  setCanonicalURL(url?: string) { 
    const selfUrl = this.router.snapshot['_routerState'].url == '/' ? window.location.origin : this.dom.URL;
    const URL = url == undefined ? selfUrl : url;
    const canURL = URL.split('?')[0];
    const link: HTMLLinkElement = this.dom.createElement('link'); 
    const current = document.querySelectorAll('[rel="canonical"]')[0];
    if(current){
      current.remove();
    } 
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

}