import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxesListComponent } from './cashboxes-list.component';

describe('CashboxesListComponent', () => {
  let component: CashboxesListComponent;
  let fixture: ComponentFixture<CashboxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashboxesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
