import { Injectable } from "@angular/core";

import { ModalController } from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class ModalGuard  {
    constructor(private readonly modalController: ModalController) { }
    canDeactivate()
    {
        return this.modalController.getTop().then((modal) => {
            if (modal) {
                this.modalController.dismiss();
                window.history.pushState(null, null, location.href);
                return false;
            }
            return true;
        });
    }
}