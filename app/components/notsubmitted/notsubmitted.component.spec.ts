import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotsubmittedComponent } from './notsubmitted.component';

describe('NotsubmittedComponent', () => {
  let component: NotsubmittedComponent;
  let fixture: ComponentFixture<NotsubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotsubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotsubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
