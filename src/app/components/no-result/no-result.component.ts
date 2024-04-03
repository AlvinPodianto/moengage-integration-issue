import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss'],
})
export class NoResultComponent implements OnInit {
  @Input('title') title:string;
  @Input('text') text:string;
  @Input('button') button:string;
  @Input('link') link:string;
  @Input('imgUrl') imgUrl:string = "../../../../assets/images/no-result.png";
  @Input('imgStyle') imgStyle:any;
  @Input() isCustomAction:boolean = false;
  @Input('buttonClass') buttonClass:string; 
  
  constructor(protected router:Router) { }

  ngOnInit() {}

  gotoDetail()
  { 
    this.router.navigateByUrl(`/${this.link}`);  
  } 
}
