import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XngBreadcrumbComponent } from './xng-breadcrumb.component';

describe('XngBreadcrumbComponent', () => {
  let component: XngBreadcrumbComponent;
  let fixture: ComponentFixture<XngBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XngBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(XngBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
