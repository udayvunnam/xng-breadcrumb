import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorEditComponent } from './mentor-edit.component';

describe('MentorEditComponent', () => {
  let component: MentorEditComponent;
  let fixture: ComponentFixture<MentorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MentorEditComponent]
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
