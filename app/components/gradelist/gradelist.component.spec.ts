import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradelistComponent } from './gradelist.component';

describe('GradelistComponent', () => {
  let component: GradelistComponent;
  let fixture: ComponentFixture<GradelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
