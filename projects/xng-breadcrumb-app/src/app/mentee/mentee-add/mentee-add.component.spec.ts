import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeAddComponent } from './mentee-add.component';
import { MENTEE_ROUTE_COMPONENETS, MenteeRoutingModule } from '../mentee-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('MenteeAddComponent', () => {
  let component: MenteeAddComponent;
  let fixture: ComponentFixture<MenteeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [SharedModule, MenteeRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
