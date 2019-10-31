import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingprojectsComponent } from './ongoingprojects.component';

describe('OngoingprojectsComponent', () => {
  let component: OngoingprojectsComponent;
  let fixture: ComponentFixture<OngoingprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
