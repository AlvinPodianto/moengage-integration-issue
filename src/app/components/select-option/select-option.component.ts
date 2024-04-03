import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ISimpleMasterData } from 'src/app/models/master.model';
import { OptionModalComponent } from './option-modal/option-modal.component';

@Component({
  selector: 'srx-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent implements OnInit {
  @Input() label:string = "";
  @Input() labelColor:string="dark";
  @Input() isValid:boolean = true;
  @Input() options:ISimpleMasterData[] = [];
  @Input() borderStyle:string = "rounded";
  @Input() infoMessage:string = "";

  @Input() errorMessage:string = "";

  @Input('value') selectedOption:ISimpleMasterData = { id:0, name:''};

  @Output() onChange = new EventEmitter<ISimpleMasterData>();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    
  }

  async showSheet()
  {
    const presentModel = await this.modalController.create({
        component: OptionModalComponent,
        componentProps: {
          title:this.label,
          options:this.options,
          selectedOption:this.selectedOption
        },
        cssClass: 'srx-bottom-sheet'
    });

    presentModel.onDidDismiss().then( ({data}) => {
      if(data)
      {
        this.onChange.emit(data?.selected);
        this.selectedOption = data?.selected;
      }
    });

    return await presentModel.present();
  }
}
