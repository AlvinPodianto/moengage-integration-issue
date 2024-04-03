import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ISimpleMasterData } from 'src/app/models/master.model';

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html'
})
export class OptionModalComponent implements OnInit {
  title:string="";
  options:ISimpleMasterData[] = [];
  selectedOption:ISimpleMasterData = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}


  dismiss() {
    this.modalController.dismiss({
      selected:this.selectedOption
    });
  }

  onModalDismiss(){
    this.modalController.dismiss();
  }

  onChangeselect(event)
  {
    this.modalController.dismiss({
        selected:event.detail.value || this.selectedOption
    });
  }
}
