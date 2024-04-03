import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'srx-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})

export class RefresherComponent implements OnInit {
  @Output() onRefresh = new EventEmitter<any>(null);

  constructor() { }

  ngOnInit() { }

  doRefresh(event) {
    this.onRefresh.emit(event);

    setTimeout(() => {
      event.target.complete();
    }, 5000);
  }
}