import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SbaRank } from 'src/app/modelClasses/sba-rank';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';



@Component({
  selector: 'app-sba-leaderboard',
  templateUrl: './sba-leaderboard.component.html',
  styleUrls: ['./sba-leaderboard.component.css']
})
export class SbaLeaderboardComponent implements OnInit {

  sbaleaderboard: SbaRank[] = [];

  constructor(private dataShare: DataSharingService,
    private https: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else
        this.getSBALeaderBoard();
    }
    else
      this.router.navigate(['../Login']);
  }

  public getSBALeaderBoard() {
    console.log("Starting JBALeaderboard");
    this.https.post<SbaRank[]>('http://localhost:8080/employee/sbaleaderboard', null).subscribe(
      response => {
        this.sbaleaderboard = response;
        console.log(this.sbaleaderboard);
      }
    );
  }

}
