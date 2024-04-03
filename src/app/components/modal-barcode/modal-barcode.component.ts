import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-barcode',
  templateUrl: './modal-barcode.component.html',
  styleUrls: ['./modal-barcode.component.scss'],
})
export class ModalBarcodeComponent implements OnInit {
  title:string = ""; 
  caption:string = ""; 
  cardNumber:string = "";
  name:string = ""; 
  cardNumberDisplay:string = ""; 
  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  onModalDismiss(){
    this.modalController.dismiss({
      result:false
    });
  }

  onClickEv(resData)
  {
    this.modalController.dismiss({
      result:resData
    });
  }
}
