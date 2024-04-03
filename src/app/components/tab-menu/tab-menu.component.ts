import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISimpleMasterData } from 'src/app/models/master.model';

@Component({
  selector: 'srx-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  @Output() OnTabChange = new EventEmitter<ISimpleMasterData>(null);
  @Input('data') tabItems:ISimpleMasterData[] = [];
  @Input() activeIndex:number = 0;
  @Input('isVertical') isVertical:boolean=false;

  constructor() { }

  ngOnInit() {}

  setTabState(index)
  {
    this.activeIndex = index;
    this.OnTabChange.emit(this.tabItems[index]);
  }
}
