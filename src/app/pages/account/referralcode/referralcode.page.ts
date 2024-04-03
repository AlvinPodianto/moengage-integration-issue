import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referralcode',
  templateUrl: './referralcode.page.html',
  styleUrls: ['./referralcode.page.scss'],
})
export class ReferralcodePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onBack(){
    this.router.navigate(["/account"]);
  }
}
