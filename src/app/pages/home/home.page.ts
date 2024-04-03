import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ModalController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { PartnerInfo, UserInfo } from 'src/app/models/auth.model';
import { Announcement, IPagedQuery } from 'src/app/models/master.model';
import { Product, ProductPageQuery } from 'src/app/models/product.model';
import { websiteSchema, orgSchema } from 'src/app/models/structure-data.model';

import { LogData } from 'src/app/models/log.model';
import { AuthService, CanonicalService, JsonLDService, LoadingService, LogService, MetaService, NotificationService } from 'src/app/sevices';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('homeContent') homeContent: IonContent;
  hasLoadHeaderSubject: Subject<boolean>;
  isHeaderActive: boolean = false;

  announcementSubject: Subject<Announcement[]>;
  hideAnnouncement: boolean = false;

  bannerQuery: IPagedQuery = {
    page: 1,
    itemsPerPage: 5,
    search: ''
  }
  isHomePromo1Loaded: boolean = false;
  isHomePromo2Loaded: boolean = false;
  recomendedProductQuerySubject: Subject<ProductPageQuery>;
  isRecomendedProductLoaded: boolean = true;
  bestSellingProductQuerySubject: Subject<ProductPageQuery>;
  isBestSellingLoaded: boolean = false;
  topOfferProductQuerySubject: Subject<ProductPageQuery>;
  isTopOfferLoaded: boolean = false;
  newArrivalProductQuerySubject: Subject<ProductPageQuery>;
  isNewArrivalLoaded: boolean = false;
  isPromoLoaded: boolean = false;

  isBrandPopularLoaded: boolean = false;
  isArticleLoaded: boolean = false;

  isStoreLoaded: boolean = false;

  isAchievementLoaded: boolean = false;

  isTestimonialLoaded: boolean = false;
  watermarkSubject: Subject<boolean>;
  recommendationTabProduct: Product[] = [];
  isRecommendationTabLoaded: boolean = false;
  isRecommendationLoading: boolean = true;
  productTabQuery: ProductPageQuery = new ProductPageQuery();
  productTabQuerySubject: Subject<ProductPageQuery>;
  resultPerPage: number = 0;
  totalRecords: number = 0;
  isFailedSearch: boolean = false;
  allSelectionTagName: string[] = [];
  totalActiveNotif: number = 0;
  totalActiveCart: number = 0;
  isShowAnnouncement: boolean = true;
  userInfo: UserInfo = new UserInfo();
  partnerInfo: PartnerInfo = new PartnerInfo();
  isLogin: boolean = this.authService.isUserLogin()
  logData: LogData = new LogData();

  constructor(
    private logService: LogService, private authService: AuthService, private structureData: JsonLDService, private canonicalService: CanonicalService,
    private metaService: MetaService, protected notificationService: NotificationService, protected loadingService: LoadingService,
    private router: Router, protected modalController: ModalController,
    protected toastController: ToastController, public platform: Platform) {
    this.recomendedProductQuerySubject = new BehaviorSubject<ProductPageQuery>(null);
    this.bestSellingProductQuerySubject = new BehaviorSubject<ProductPageQuery>(null);
    this.topOfferProductQuerySubject = new BehaviorSubject<ProductPageQuery>(null);
    this.newArrivalProductQuerySubject = new BehaviorSubject<ProductPageQuery>(null);
    this.productTabQuerySubject = new BehaviorSubject<ProductPageQuery>(null);
    this.watermarkSubject = new BehaviorSubject<boolean>(null);
    this.hasLoadHeaderSubject = new BehaviorSubject<boolean>(null);
    this.announcementSubject = new BehaviorSubject<Announcement[]>(null);

    this.userInfo = this.authService.getUserInfo();
    this.authService.partnerInfo$.subscribe(x => this.partnerInfo = x);
  }

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
    
    this.hasLoadHeaderSubject.next(true);
    this.watermarkSubject.next(true);
    this.structureData.removeStructuredData();
    this.structureData.insertSchema(websiteSchema);
    this.structureData.insertSchema(orgSchema);

    this.isAchievementLoaded = true;
  }

  ionViewDidEnter() {
    const isFromlogin = sessionStorage.getItem('isFromLogin');

    if (isFromlogin) {
      sessionStorage.removeItem('isFromLogin');
      this.ngOnInit();
    }

    this.structureData.pageView('homePage', this.userInfo.customerID);
  }
}