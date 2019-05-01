import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeListComponent } from './mentee-list.component';
import { CommonModule } from '@angular/common';
import { MenteeRoutingModule, MENTEE_ROUTE_COMPONENETS } from '../mentee-routing.module';

describe('MenteeListComponent', () => {
  let component: MenteeListComponent;
  let fixture: ComponentFixture<MenteeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [CommonModule, MenteeRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
