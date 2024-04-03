import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn:'root'
})
export class ToastService{
    constructor(protected router: Router, public toastController:ToastController){

    }

    async presentToast(msg: string, type: string, isProduct:boolean = false) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 1000,
          color: type,
          cssClass: isProduct ?'srx-product-toast' : undefined
        });
        toast.present();
    }
    
    async successCartToast() {
        const toast = await this.toastController.create({
          message: '<img src="../../../assets/icon/check.svg" alt="check-cart"><br>Berhasil menambahkan ke keranjang',
          duration: 1000,
          position:'middle',
          color: 'medium',
          cssClass: 'success-cart-toast'
        });
        toast.present();
    }
    
    async addCartToast() {
      const toast = await this.toastController.create({
        message: 'Berhasil menambahkan ke keranjang',
        duration: 1000, 
        color: "secondary",
        cssClass: 'srx-product-toast', 
        buttons: [{
            text: 'Lihat',
            role: 'cancel',
            handler: () => {  
              this.router.navigateByUrl("/cart-page");
            }
          }
        ]
      });
      toast.present();
  }
}