import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeAddComponent } from './mentee-add.component';

describe('MenteeAddComponent', () => {
  let component: MenteeAddComponent;
  let fixture: ComponentFixture<MenteeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenteeAddComponent ]
    })
    .compileComponents();
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
