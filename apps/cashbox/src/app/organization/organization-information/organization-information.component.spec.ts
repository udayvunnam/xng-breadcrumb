import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInformationComponent } from './organization-information.component';

describe('OrganizationInformationComponent', () => {
  let component: OrganizationInformationComponent;
  let fixture: ComponentFixture<OrganizationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationInformationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
