import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsrsComponent } from './devsrs.component';

describe('DevsrsComponent', () => {
  let component: DevsrsComponent;
  let fixture: ComponentFixture<DevsrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevsrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
