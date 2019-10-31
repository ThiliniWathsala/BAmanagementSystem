import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradealertComponent } from './gradealert.component';

describe('GradealertComponent', () => {
  let component: GradealertComponent;
  let fixture: ComponentFixture<GradealertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradealertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
