import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsrsComponent } from './pmsrs.component';

describe('PmsrsComponent', () => {
  let component: PmsrsComponent;
  let fixture: ComponentFixture<PmsrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
