import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ISimpleMasterData } from 'src/app/models/master.model';
import { LogData } from 'src/app/models/log.model';
import { PrescriptionPageQuery } from 'src/app/models/prescription.model';
import { isMobileDevice } from 'src/app/helpers/helper';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {
  isAbleBack: boolean = false;
  totalRecords: number = 0;
  isMobileDevice = isMobileDevice;
  prescriptionQuery: Subject<PrescriptionPageQuery>;
  ableNext: boolean = true;
  ablePrev: boolean = false;
  precriptionStatuses: ISimpleMasterData[] = [];
  query: PrescriptionPageQuery = new PrescriptionPageQuery();
  logData: LogData = new LogData();

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() { }
}    
