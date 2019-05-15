import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeEditComponent } from './mentee-edit.component';

describe('MenteeEditComponent', () => {
  let component: MenteeEditComponent;
  let fixture: ComponentFixture<MenteeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenteeEditComponent]
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
