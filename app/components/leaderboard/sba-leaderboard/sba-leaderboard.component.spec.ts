import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbaLeaderboardComponent } from './sba-leaderboard.component';

describe('SbaLeaderboardComponent', () => {
  let component: SbaLeaderboardComponent;
  let fixture: ComponentFixture<SbaLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbaLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbaLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
