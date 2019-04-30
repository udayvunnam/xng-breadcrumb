import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDetailsComponent } from './mentee-details.component';

describe('MenteeDetailsComponent', () => {
  let component: MenteeDetailsComponent;
  let fixture: ComponentFixture<MenteeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenteeDetailsComponent ]
    })
    .compileComponents();
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
