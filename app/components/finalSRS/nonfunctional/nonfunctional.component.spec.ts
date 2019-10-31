import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonfunctionalComponent } from './nonfunctional.component';

describe('NonfunctionalComponent', () => {
  let component: NonfunctionalComponent;
  let fixture: ComponentFixture<NonfunctionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonfunctionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonfunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
