import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'srx-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})

export class InputTextComponent implements OnInit {
  @Input() mode: string = "";
  @Input() name: string = '';
  @Input() label: string = "";
  @Input() infoMessage: string = "";
  @Input() inputModel: string;
  @Input() inputType: string = "text";
  @Input() isValid: boolean = true;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() class: string = "form-textbox";
  @Input() styleType: string = "rounded";

  @Output() inputModelChange = new EventEmitter<string>();
  @Output() onKeyUp = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('srxInput') ionInput: { setFocus: () => void; };
  constructor() { }

  ngOnInit() { } 
  onKeyUpEv(event) {
    if (this.inputType == 'number') {
      let valInput = parseInt(event.target.value);
      if (valInput < 0)
        event.target.value = valInput * -1;
    }
    this.onKeyUp.emit(event);
  }

  onChangeEv(event) {
    this.onChange.emit(event);
  }
  setFocusOnInput() {
    this.ionInput.setFocus();
 }
}
