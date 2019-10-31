import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayinterfaceComponent } from './displayinterface.component';

describe('DisplayinterfaceComponent', () => {
  let component: DisplayinterfaceComponent;
  let fixture: ComponentFixture<DisplayinterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayinterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
