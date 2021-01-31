import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxRegistrationComponent } from './cashbox-registration.component';

describe('CashboxRegistrationComponent', () => {
  let component: CashboxRegistrationComponent;
  let fixture: ComponentFixture<CashboxRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashboxRegistrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
