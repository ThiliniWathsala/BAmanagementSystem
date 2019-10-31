import { Component, OnInit } from '@angular/core';
import { Reply } from 'src/app/modelClasses/reply';
import { Answer } from 'src/app/modelClasses/answer';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-replylist',
  templateUrl: './replylist.component.html',
  styleUrls: ['./replylist.component.css']
})
export class ReplylistComponent implements OnInit {

  replylist: Reply[] = [];

  answerproject: Answer = {
    answerid:'',
    questionid:'',
    content:'',
    date:'',
    time:'',
    employeeid:''
  };

  admincheck = false;

  constructor(private http1: HttpClient,
    private EncrDecr: EncrDecrService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if (this.cookieService.check(encrypted1))
      this.admincheck = true;

      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
      encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
      var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
      var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
  
      if (this.cookieService.check(encrypted)) {
        if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
          this.router.navigate(['../NewPassword']);
        else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
          this.router.navigate(['../GradeAlert']);
        else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
          this.router.navigate(['../UserAccessOnly']);
        else
          this.getReply();
      }
      else
        this.router.navigate(['../Login']);
  }

  getReply() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'answerid');
    this.answerproject.answerid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Reply[]>('http://localhost:8080/project/replylist', this.answerproject).subscribe(
      response => {
        this.replylist = response;
        console.log(this.replylist);
      });
    this.http1.post<Answer>('http://localhost:8080/project/answer', this.answerproject).subscribe(
      response => {
        this.answerproject = response;
        console.log(this.answerproject);
      });
  }

  newReply() {
    this.router.navigate(['../Reply']);
  }

}
