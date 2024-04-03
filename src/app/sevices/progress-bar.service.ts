import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { ProgressBarComponent } from "src/app/components/progress-bar/progress-bar.component";

@Injectable({
	providedIn: 'root'
})

export class ProgressBarService {
	protected progressValueSubject: BehaviorSubject<number>;
	progressValue$: Observable<number>;

    isShow:boolean = false;

	constructor(public modalController: ModalController) {
		this.progressValueSubject = new BehaviorSubject<number>(0);
		this.progressValue$ = this.progressValueSubject.asObservable();
    }

    setProgress(value:number)
    {
        this.progressValueSubject.next(value);
    }

    async present(){
        this.isShow = true;

        return await this.modalController.create({
			component: ProgressBarComponent,
			componentProps: {
                progressValue:0
            },
			cssClass: 'srx-modal-full',
			backdropDismiss: false,
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