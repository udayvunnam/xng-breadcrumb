import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeEditComponent } from './mentee-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { MenteeRoutingModule, MENTEE_ROUTE_COMPONENETS } from '../mentee-routing.module';
import { RouterModule } from '@angular/router';

describe('MenteeEditComponent', () => {
  let component: MenteeEditComponent;
  let fixture: ComponentFixture<MenteeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [SharedModule, MenteeRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
