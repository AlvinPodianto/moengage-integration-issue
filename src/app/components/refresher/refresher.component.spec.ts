import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefresherComponent } from './refresher.component';

describe('RefresherComponent', () => {
  let component: RefresherComponent;
  let fixture: ComponentFixture<RefresherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefresherComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefresherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
