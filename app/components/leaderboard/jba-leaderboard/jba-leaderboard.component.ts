import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { JbaRank } from 'src/app/modelClasses/jba-rank';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-jba-leaderboard',
  templateUrl: './jba-leaderboard.component.html',
  styleUrls: ['./jba-leaderboard.component.css']
})
export class JbaLeaderboardComponent implements OnInit {

  jbaleaderboard: JbaRank[] = [];

  constructor(private dataShare: DataSharingService,
    private https: HttpClient,
    private router: Router,
    private EncrDecr: EncrDecrService,
    private cookieService: CookieService) { }

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
        this.getJBALeaderBoard();
    }
    else
      this.router.navigate(['../Login']);
  }

  public getJBALeaderBoard() {
    console.log("Starting JBALeaderboard");
    this.https.post<JbaRank[]>('http://localhost:8080/employee/jbaleaderboard', null).subscribe(
      response => {
        this.jbaleaderboard = response;
        console.log(this.jbaleaderboard);
      }
    );
  }

  // rank:number=0;
  // public count(){
  //     this.rank++;
  //     return this.rank;
  // }

}
