import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorComponent } from './mentor.component';
import { MENTOR_ROUTE_COMPONENETS, MentorRoutingModule } from '../mentor-routing.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';

describe('MentorComponent', () => {
  let component: MentorComponent;
  let fixture: ComponentFixture<MentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTOR_ROUTE_COMPONENETS],
      imports: [CommonModule, CoreModule, MentorRoutingModule, AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
