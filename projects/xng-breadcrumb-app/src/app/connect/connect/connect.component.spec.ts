import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectComponent } from './connect.component';
import { SharedModule } from '../../shared/shared.module';
import { ConnectRoutingModule } from '../connect-routing.module';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectComponent],
      imports: [SharedModule, ConnectRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
