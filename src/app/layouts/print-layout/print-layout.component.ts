import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss'],
})
export class PrintLayoutComponent implements OnInit {

  constructor(private location:Location, private router:Router) {
  }

  ngOnInit() {
  }
  ionViewDidEnter(){ 
    setTimeout(() => { 
      window.print();  
    }, 1000);
  }
  initElement()
  {
    // create own css
    let css:any = `
      @media screen {
        :host {
          display: none;
        }
        @page { margin: 0; }
        body { margin: 1.6cm; }
      }
    `;
    let head:any = document.head || document.getElementsByTagName('head')[0];
    let style:any = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';

    if (style.styleSheet)
      style.styleSheet.cssText = css;
    else
      style.appendChild(document.createTextNode(css));
    
    // use print body css for change width element
    document.body.classList.add('print-body');

    const printArea = document.getElementById('print-area');

    // replace & remove body element with print-area id element
    document.body.innerHTML = printArea.innerHTML;
  }

}
