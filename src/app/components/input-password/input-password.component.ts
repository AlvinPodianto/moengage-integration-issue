import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'srx-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {
  @Input() label: string = "";
  @Input() infoMessage: string = "";
  @Input() inputModel: string;
  @Input() isValid: boolean = true;
  @Input() styleType: string = "rounded";
  @Input() name = '';

  @Output() inputModelChange = new EventEmitter<string>();
  @Output() onKeyUp = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  isShowPassword: boolean = false;

  constructor() { }

  ngOnInit() { }

  onModelChangeEv(event) {
    this.inputModelChange.emit(this.inputModel);
    this.onModelChange.emit(event);
  }

  onKeyUpEv(event) {
    this.onKeyUp.emit(event);
  }

  showHidePass() {
    this.isShowPassword = !this.isShowPassword;
  }
}
