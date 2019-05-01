import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDetailsComponent } from './mentee-details.component';
import { MENTEE_ROUTE_COMPONENETS, MenteeRoutingModule } from '../mentee-routing.module';
import { CommonModule } from '@angular/common';

describe('MenteeDetailsComponent', () => {
  let component: MenteeDetailsComponent;
  let fixture: ComponentFixture<MenteeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [CommonModule, MenteeRoutingModule]
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
