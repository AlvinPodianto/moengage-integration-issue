import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReferralcodePage } from './referralcode.page';

describe('ReferralcodePage', () => {
  let component: ReferralcodePage;
  let fixture: ComponentFixture<ReferralcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferralcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
