import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDetailsComponent } from './mentee-details.component';
import { MENTEE_ROUTE_COMPONENETS, MenteeRoutingModule } from '../mentee-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('MenteeDetailsComponent', () => {
  let component: MenteeDetailsComponent;
  let fixture: ComponentFixture<MenteeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [SharedModule, MenteeRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
