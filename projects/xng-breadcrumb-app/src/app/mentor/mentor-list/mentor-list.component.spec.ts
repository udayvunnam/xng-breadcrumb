import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorListComponent } from './mentor-list.component';
import { MENTOR_ROUTE_COMPONENETS, MentorRoutingModule } from '../mentor-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('MentorListComponent', () => {
  let component: MentorListComponent;
  let fixture: ComponentFixture<MentorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTOR_ROUTE_COMPONENETS],
      imports: [SharedModule, MentorRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
