import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanonicalService, MetaService } from 'src/app/sevices';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})

export class NotFoundPage implements OnInit {
  parentUrl: string;
  customArr = Array;

  constructor(
    protected metaService: MetaService,
    protected canonicalService: CanonicalService,
    private router: Router) { }

  ngOnInit() {
    const parent = window.location.pathname.split('/');

    if (this.router.url == '/artikel' || parent[1] == 'artikel') {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      }).then(() => {
        window.location.reload();
      });
    }

    const paths = window.location.pathname.split('/');

    paths.forEach(
      (item) => item != '' ? console.log(item) : ''
    );
    
    this.canonicalService.setCanonicalURL(window.location.origin + '/404');
    this.metaService.setDefaultMeta("404-desktop", true);
  }


  ionViewDidEnter() {
    this.metaService.setDefaultMeta("404-desktop", true);
  }

  toHome() {
    this.router.navigate(['/']);
  }
}
