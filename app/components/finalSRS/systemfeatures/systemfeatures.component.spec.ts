import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemfeaturesComponent } from './systemfeatures.component';

describe('SystemfeaturesComponent', () => {
  let component: SystemfeaturesComponent;
  let fixture: ComponentFixture<SystemfeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemfeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
