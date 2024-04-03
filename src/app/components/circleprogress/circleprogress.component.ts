import { Component,  ElementRef,  Input,  OnInit,  SimpleChanges,  ViewChild } from '@angular/core';
@Component({
  selector: 'circle-progress',
  templateUrl: './circleprogress.component.html',
  styleUrls: ['./circleprogress.component.scss'],
})
export class CircleProgress implements OnInit {
  @Input() progress: number;
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    let scrollProgress = Array.from(document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement>)
    for (let index = 0; index < scrollProgress.length; index++) {
      scrollProgress[index].style.background = `conic-gradient(#008fff ${this.progress}%, transparent ${this.progress}%)`; 
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
}