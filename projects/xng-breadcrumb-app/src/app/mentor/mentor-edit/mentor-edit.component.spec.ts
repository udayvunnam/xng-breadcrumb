import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorEditComponent } from './mentor-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { MentorRoutingModule, MENTOR_ROUTE_COMPONENETS } from '../mentor-routing.module';

describe('MentorEditComponent', () => {
  let component: MentorEditComponent;
  let fixture: ComponentFixture<MentorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTOR_ROUTE_COMPONENETS],
      imports: [SharedModule, MentorRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
