import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'register-info',
  templateUrl: './register-info.page.html',
  styleUrls: ['../login.page.scss'],
})
export class RegisterInfoPage implements OnInit {
  @Input() username:string = "";
  @Input() type:string = "";

  captionTitle:any;

  constructor(private modalController: ModalController) {

  }

  ngOnInit() {
      this.captionTitle = {
          phone : {
            caption1 : "Nomor ponsel tersebut belum terdaftar.",
            caption2 : "Apakah kamu ingin mendaftarkan nomor tersebut?"
          },
          email : {
            caption1 : "Email tersebut belum terdaftar.",
            caption2 : " Apakah kamu ingin mendaftarkan email tersebut?"
          }
      };
  }

  onModalDismiss(){
    this.modalController.dismiss({
        isRegister:false
    });
  }

  doRegister()
  {
    this.modalController.dismiss({
        isRegister:true
    });
  }

}
