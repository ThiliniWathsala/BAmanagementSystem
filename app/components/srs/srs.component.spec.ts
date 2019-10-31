import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SRSComponent } from './srs.component';

describe('SRSComponent', () => {
  let component: SRSComponent;
  let fixture: ComponentFixture<SRSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SRSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
