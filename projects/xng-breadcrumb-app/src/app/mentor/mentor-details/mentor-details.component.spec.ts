import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDetailsComponent } from './mentor-details.component';
import { MENTOR_ROUTE_COMPONENETS, MentorRoutingModule } from '../mentor-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('MentorDetailsComponent', () => {
  let component: MentorDetailsComponent;
  let fixture: ComponentFixture<MentorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTOR_ROUTE_COMPONENETS],
      imports: [SharedModule, MentorRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
