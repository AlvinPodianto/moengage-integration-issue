import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalSocialSharingComponent } from "../components/modal-social-sharing/modal-social-sharing.component";
import { ShareQuery } from "../models/common.model";

@Injectable({
	providedIn: 'root'
})

export class SocialSharingService {
    isShow:boolean = false;

	deviceModel: any = '';

	constructor(public modalController: ModalController) {
    }

	ngOnInit() {
		 this.deviceModel = parseFloat(localStorage.getItem('model-number'));
	}

	present(query:ShareQuery){
		try{
			navigator
			.share(query)
			.then(() => {
				// console.log('Share with Web API');
			})
			.catch((error) =>{
				// console.log('Error sharing:', error)
			});
		}
		catch(error)
		{
			// console.log("Share with custom UI");

			this.showModalSharing(query);
		}
	}

    private async showModalSharing(query:ShareQuery){
        this.isShow = true;

        return await this.modalController.create({
			component: ModalSocialSharingComponent,
			componentProps: {
                shareQuery:query
            },
			showBackdrop:true,
			cssClass: this.deviceModel > 105 ? 'srx-modal-alert modal-alert-ios-106' : 'srx-modal-alert',
			backdropDismiss: true,
		}).then(a => {
			a.present().then(() => {
				if (!this.isShow) {
					a.dismiss();
				}
			});
		});
    }

    async dismiss() {
		if (this.isShow) {
			this.isShow = false;
			return await this.modalController.dismiss().catch(error=>console.log(error));
		}
		else
			return;
	}
}