import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isMobileDevice } from 'src/app/helpers/helper';
import { ShareQuery } from 'src/app/models/common.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-social-sharing',
  templateUrl: './modal-social-sharing.component.html',
  styleUrls: ['./modal-social-sharing.component.scss'],
})

export class ModalSocialSharingComponent implements OnInit {
  title: string = "Bagikan halaman ini";
  shareQuery: ShareQuery;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  onModalDismiss() {
    this.modalController.dismiss({
      result: false
    });
  }

  actionShare(option: string) {
    let message = `${this.shareQuery.text}\n\n${this.shareQuery.url}`;
    let encodedMessage = encodeURIComponent(`${message}`);
    let mobileUrl = "";
    let webUrl = "";

    switch (option) {
      case 'whatsapp':
        webUrl = `${environment.waMessagingUrl}/send?text=${encodedMessage}`;
        mobileUrl = `whatsapp://send?text=${encodedMessage}`;
        break;

      case 'facebook':
        webUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.shareQuery.url}&quote=${encodedMessage}`;
        mobileUrl = webUrl;
        break;

      case 'twitter':
        webUrl = `https://twitter.com/share?url=${this.shareQuery.url}&text=${encodedMessage}`;
        mobileUrl = webUrl;
        break;

      case 'email':
        webUrl = `mailto:?subject=${encodeURIComponent(this.shareQuery.title)}&body=${encodedMessage}`;
        mobileUrl = webUrl;
        break;

      case 'copy':
        this.copyMessage(this.shareQuery.url);
        
        this.modalController.dismiss({
          result: true
        });

        return;
    }


    if (!isMobileDevice()) {
      window.open(webUrl, "_blank");
    }
    else {
      window.location.href = mobileUrl;
    }

    this.modalController.dismiss({
      result: false
    });
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
