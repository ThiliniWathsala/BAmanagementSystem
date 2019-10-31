import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbaLeaderboardComponent } from './jba-leaderboard.component';

describe('JbaLeaderboardComponent', () => {
  let component: JbaLeaderboardComponent;
  let fixture: ComponentFixture<JbaLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbaLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbaLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
