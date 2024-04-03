import { Component, OnInit } from '@angular/core'; 
import { ProgressBarService } from 'src/app/sevices';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  progressValue:number = 0;

  constructor(private progressBarService:ProgressBarService) {
    this.progressBarService.progressValue$.subscribe(
      (data)=>{
        if(data!=null)
        {
          this.progressValue = data;
        }
      }
    )
  }

  ngOnInit() {}

}
