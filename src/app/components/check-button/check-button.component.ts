import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { isStrEmail, isStrPhone } from 'src/app/helpers/helper';
import { LogData } from 'src/app/models/log.model';
import { HttpErrorInfo } from 'src/app/models/master.model';
import { AuthService, LogService } from 'src/app/sevices';

@Component({
  selector: 'check-button',
  templateUrl: './check-button.component.html',
  styleUrls: ['./check-button.component.scss'],
})

export class CheckButtonComponent implements OnInit {
  @Input() isDisable: boolean = true;
  @Input() input: string = "";
  @Input() keyEnter: Subject<boolean>;
  @Input() nousername: boolean = false;

  isLoading: boolean = false;
  logData: LogData = new LogData();
  registerType: string = "";
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private authService: AuthService, private logService: LogService) {
    this.keyEnter = new BehaviorSubject<boolean>(null);
  }

  ngOnInit() {
    this.keyEnter?.asObservable()?.subscribe(
      data => {
        if (data) {
          this.checkAccount();
        }
      }
    );
  }

  checkAccount() {
    if (!this.validateInput())
      return;

    this.isLoading = true;

    this.authService.getOtpMethods(this.nousername ? "" : this.registerType == 'phone' ? (this.input).replace('+62', '62') : this.input).subscribe(
      (data: any) => {
        this.logData.action = 'click';
        this.logData.responseCode = 200;
        this.logData.actionLabel = 'get exist customer';
        this.logData.actionValue = '/Accounts/Exist?input=' + this.input;
        this.logData.codeDescription = "";
        this.logService.onSendLog(this.logData).subscribe();
        this.onSubmit.emit({ isError: false, data: data, input: this.input, registerType: this.registerType, hasPassword: data?.hasPassword, otpMethods: data?.otpMethods, isExist: data?.isExist });
      },
      (error: HttpErrorInfo) => {
        this.logData.action = 'click';
        this.logData.responseCode = error.status;
        this.logData.actionLabel = 'get exist customer';
        this.logData.actionValue = error.url;
        this.logData.codeDescription = error.message;
        this.logService.onSendLog(this.logData).subscribe();
        this.isLoading = false;
        this.onSubmit.emit({ isError: true, data: error, input: this.input, registerType: this.registerType });
      },
      () => {
        this.isLoading = false;
      }
    )
  }
  validateInput(): boolean {
    if (isStrPhone(this.input)) {
      if (this.input[0] == "+")
        this.input = this.input.substr(1, this.input.length);

      if (this.input.substr(0, 2) == "08")
        this.input = "628" + this.input.substr(2, this.input.length);

      this.registerType = "phone";
    }
    else if (isStrEmail(this.input)) {
      this.registerType = "email";
    }
    else {
      return false;
    }

    return true;
  }
}
