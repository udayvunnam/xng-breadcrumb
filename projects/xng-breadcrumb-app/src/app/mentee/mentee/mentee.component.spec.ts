import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeComponent } from './mentee.component';
import { MenteeRoutingModule, MENTEE_ROUTE_COMPONENETS } from '../mentee-routing.module';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

describe('MenteeComponent', () => {
  let component: MenteeComponent;
  let fixture: ComponentFixture<MenteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MENTEE_ROUTE_COMPONENETS],
      imports: [SharedModule, CoreModule, AppRoutingModule, MenteeRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
