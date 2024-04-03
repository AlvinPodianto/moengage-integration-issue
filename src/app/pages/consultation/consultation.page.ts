import { Component, OnInit } from '@angular/core';
import { ContactDestination } from 'src/app/models/contact.enum';
import { IInfo } from 'src/app/models/master.model';
import { Router } from '@angular/router';
import { LogData } from 'src/app/models/log.model';
import { JsonLDService, LogService, NavigationService } from 'src/app/sevices';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.page.html',
  styleUrls: ['./consultation.page.scss'],
})

export class ConsultationPage implements OnInit {
  contactInfo: IInfo = undefined;
  logData: LogData = new LogData();
  contactDestination = ContactDestination;

  constructor(private logService: LogService, private router: Router,
    private navigationService: NavigationService,
    private structureData: JsonLDService, public platform: Platform) { }

  ngOnInit() { }

  backHandler() {
    this.navigationService.back();
  }

  clickLayer(event, label) {
    this.structureData.clickLayer(event, label);
  }
}
