import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//tvlk import { isPartner } from 'src/app/helpers/helper';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  //tvlk isPartner:boolean=isPartner();
  title:string = "";  
  
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
