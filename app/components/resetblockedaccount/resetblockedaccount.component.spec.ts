import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetblockedaccountComponent } from './resetblockedaccount.component';

describe('ResetblockedaccountComponent', () => {
  let component: ResetblockedaccountComponent;
  let fixture: ComponentFixture<ResetblockedaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetblockedaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetblockedaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
