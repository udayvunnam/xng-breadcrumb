import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerDashboardComponent } from './designer-dashboard.component';

describe('DesignerDashboardComponent', () => {
  let component: DesignerDashboardComponent;
  let fixture: ComponentFixture<DesignerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerDashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
