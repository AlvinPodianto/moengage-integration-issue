import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LogData } from 'src/app/models/log.model';
import { HttpErrorInfo } from 'src/app/models/master.model';
import { LogService, NavigationService, NotificationService } from 'src/app/sevices';

@Component({
  selector: 'srx-header-utility',
  templateUrl: './header-utility.component.html',
  styleUrls: ['./header-utility.component.scss'],
})

export class HeaderUtilityComponent implements OnInit {
  @Input() title: string = "";

  @Input() searchPlaceholder: string = "Cari obat di Farmaku";
  @Input() totalActiveNotif: number = 0;
  @Input() totalActiveCart: number = 0;
  @Input() hasLoadSubject: Subject<boolean>;

  @Input() ableSearch: boolean = true;
  @Output() onSearchClicked = new EventEmitter<boolean>();

  @Input() ableShare: boolean = false;
  @Output() onShare = new EventEmitter<boolean>();

  @Input() ableBack: boolean = false;
  @Output() onBackClicked = new EventEmitter<boolean>(false);

  @Input() ableNotification: boolean = false;

  @Input() ableFilter: boolean = false;
  @Output() onFilter = new EventEmitter<boolean>();
  @Input() ableHome: boolean = false;

  logData: LogData = new LogData();
  constructor(private logService: LogService, protected notificationService: NotificationService, protected navigationService: NavigationService) {
    this.hasLoadSubject = new BehaviorSubject<boolean>(null);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.loadSummary();
  }

  ngOnInit() {
    this.hasLoadSubject?.asObservable()?.subscribe(
      data => {
        if (data != null)
          this.loadSummary();
      }
    );

    this.loadSummary();
  }

  backHandler() {
    this.navigationService.back();
  }

  loadSummary() {
    this.notificationService.getCartInfo(true).then((data: any) => {
      this.logData.action = 'screenView';
      this.logData.responseCode = 200;
      this.logData.actionLabel = 'get cart info';
      this.logData.actionValue = '/Notification/Summary';
      this.logData.codeDescription = "";

      this.logService.onSendLog(this.logData).subscribe();
      this.totalActiveNotif = data?.totalNotif;
      this.totalActiveCart = data?.totalCart;
    },
      (error: HttpErrorInfo) => {
        this.logData.action = 'screenView';
        this.logData.responseCode = error.status;
        this.logData.actionLabel = 'get cart info';
        this.logData.actionValue = error.url;
        this.logData.codeDescription = error.message;
        this.logService.onSendLog(this.logData).subscribe();
      });
  }

  gotoCart() {
    this.navigationService.cart();
  }

  gotoNotification() {
    this.navigationService.notification();
  }

  gotoSearch() {
    this.navigationService.search();
  }

  gotoHome() {
    this.navigationService.navigate();
  }
}
