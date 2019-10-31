import { Component, OnInit } from '@angular/core';
import { Reply } from 'src/app/modelClasses/reply';
import { Answer } from 'src/app/modelClasses/answer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  newreply: Reply = {
    replyid:'',
    answerid:'',
    content:'',
    date:'',
    time:'',
    employeeid:''
  };

  currentanswer: Answer = {
    answerid:'',
    questionid:'',
    content:'',
    date:'',
    time:'',
    employeeid:''
  };

  admincheck = false;

  constructor(private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    // window.history.pushState( {} , 'QuestionAnswer', '/AnswerList' );
    // window.history.pushState( {} , 'Menu', '/menu' );
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
        this.getAnswer();
    }
    else
      this.router.navigate(['../Login']);
  }

  getAnswer(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'answerid');
    this.currentanswer.answerid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Answer>('http://localhost:8080/project/answer', this.currentanswer).subscribe(
      res => {
        this.currentanswer = res;
        console.log(this.currentanswer);
      }
    );
  }

  onSubmit(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'answerid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.newreply.answerid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.newreply.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Reply>('http://localhost:8080/project/newreply', this.newreply).subscribe(
      res => {
        this.newreply = res;
        console.log(this.newreply);
        alert("Your reply was submitted");
    this.router.navigate(['../ReplyList']);
      }
    );
    
  }

}
