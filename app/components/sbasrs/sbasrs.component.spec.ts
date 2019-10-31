import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbasrsComponent } from './sbasrs.component';

describe('SbasrsComponent', () => {
  let component: SbasrsComponent;
  let fixture: ComponentFixture<SbasrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbasrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbasrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
