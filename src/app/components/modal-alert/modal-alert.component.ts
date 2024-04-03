import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})

export class ModalAlertComponent implements OnInit {
  title: string = "";
  message: string = "";
  OKText: string = "Ya";
  cancelText: string = "Tidak";
  isHtml: boolean = false;
  isRadiusButton: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
   }

  onModalDismiss() {
    this.modalController.dismiss({
      result: false
    });
  }

  onClickEv(resData) {
    this.modalController.dismiss({
      result: resData
    });
  }
}
