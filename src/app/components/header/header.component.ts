import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationService } from 'src/app/sevices';

@Component({
  selector: 'srx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() actionButtonTitle: string;
  @Input() isDisabledActionButton: boolean = false;
  @Input() ableBack: boolean = false;
  @Input() backIgnoreParam: boolean = false;
  @Input() isModal: boolean = false;
  @Input() isModalPage: boolean = false;
  @Input() isActionButton: boolean = false;
  @Input() isSeoTitle: boolean = false;
  @Input() ableHome: boolean = false;

  @Output() onActionClicked = new EventEmitter<boolean>(false);
  @Output() onModalDismiss = new EventEmitter<boolean>(false);

  constructor(protected navigationService: NavigationService) { }

  ngOnInit() { }

  backHandler() {
    if (this.backIgnoreParam)
      this.navigationService.back(undefined, true);
    else
      this.navigationService.back();
  }

  actionButtonHandler() {
    this.onActionClicked.emit(true);
  }

  modalDismissHandler() {
    this.onModalDismiss.emit(true);
  }

  gotoHome() {
    this.navigationService.navigate();
  }
}
