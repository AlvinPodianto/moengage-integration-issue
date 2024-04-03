import { Component, Input, OnInit } from '@angular/core'; 
import { ModalController } from '@ionic/angular'; 

@Component({
  selector: 'message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit { 
  @Input() type: any = "";
  @Input() productName:string = "";
  @Input() finalPrice:number = 0;
  @Input() imgUrl:string = "";
  
  text:string = "";
  constructor(public modalController: ModalController) { 
  }

  ngOnInit() {  
  }
  submit(){ 
    this.modalController.dismiss({
      text: this.text,
      type: this.type
    });
  }
}
