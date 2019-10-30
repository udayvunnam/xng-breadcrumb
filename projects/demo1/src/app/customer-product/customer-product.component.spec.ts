import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductComponent } from './customer-product.component';

describe('CustomerProductComponent', () => {
  let component: CustomerProductComponent;
  let fixture: ComponentFixture<CustomerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerProductComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
