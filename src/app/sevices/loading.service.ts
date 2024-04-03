import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})

export class LoadingService {
	isLoading: boolean = false;

	constructor(public loadingController: LoadingController) { }

	async present(showDuration: number = 5000, styleClass = undefined, msg: string = "Mohon Tunggu...", showBackdrop = true) {
		this.isLoading = true;

		const maxLoading:number = showDuration == null ? 10000 : showDuration;
		
		return await this.loadingController.create({
			cssClass: styleClass,
			message: msg,
			duration: maxLoading,
			showBackdrop: showBackdrop
		}).then(a => {
			a.present().then(() => {
				if (!this.isLoading) {
					a.dismiss();
				}
			});
		});
	}

	async dismiss() {
		if (this.isLoading) {
			this.isLoading = false;
			return await this.loadingController.dismiss().catch(error=>console.log(error));
		}
		else
			return;
	}
}