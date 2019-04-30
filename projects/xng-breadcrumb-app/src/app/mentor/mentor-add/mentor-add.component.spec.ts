import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAddComponent } from './mentor-add.component';

describe('MentorAddComponent', () => {
  let component: MentorAddComponent;
  let fixture: ComponentFixture<MentorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorAddComponent ]
    })
    .compileComponents();
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
