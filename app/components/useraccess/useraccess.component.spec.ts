import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccessComponent } from './useraccess.component';

describe('UseraccessComponent', () => {
  let component: UseraccessComponent;
  let fixture: ComponentFixture<UseraccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
