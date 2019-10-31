import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesubmitComponent } from './leavesubmit.component';

describe('LeavesubmitComponent', () => {
  let component: LeavesubmitComponent;
  let fixture: ComponentFixture<LeavesubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
