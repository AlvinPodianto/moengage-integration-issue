import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'srx-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})

export class InputDateComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() name: string = '';
  @Input() label: string = "";
  @Input() infoMessage: string = "";

  @Input() value: string = "";

  @Input() inputModel: string;
  @Input() isValid: boolean = true;

  @Output() inputModelChange = new EventEmitter<string>();
  @Output() onChange = new EventEmitter<any>();

  monthNames: string[] = [];
  constructor() { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];
  }

  onChangeEv(event) {
    this.onChange.emit(event);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
