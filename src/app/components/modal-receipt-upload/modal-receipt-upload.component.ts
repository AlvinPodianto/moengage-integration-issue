import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-receipt-upload',
  templateUrl: './modal-receipt-upload.component.html',
  styleUrls: ['./modal-receipt-upload.component.scss'],
})
export class ModalReceiptUploadComponent implements OnInit {
  imageUrl:string;

  constructor(private modalController:ModalController) { }

  ngOnInit() {}
  
  onModalDismiss(){
    this.modalController.dismiss({
      result:false
    });
  }


}
