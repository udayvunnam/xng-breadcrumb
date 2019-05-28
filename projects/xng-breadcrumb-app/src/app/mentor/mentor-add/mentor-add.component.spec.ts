import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAddComponent } from './mentor-add.component';
import { MENTOR_ROUTE_COMPONENETS, MentorRoutingModule } from '../mentor-routing.module';
import { SharedModule } from '../../shared/shared.module';

describe('MentorAddComponent', () => {
  let component: MentorAddComponent;
  let fixture: ComponentFixture<MentorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTOR_ROUTE_COMPONENETS],
      imports: [SharedModule, MentorRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
