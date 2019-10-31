import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/modelClasses/answer';
import { Question } from 'src/app/modelClasses/question';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answerlist',
  templateUrl: './answerlist.component.html',
  styleUrls: ['./answerlist.component.css']
})
export class AnswerlistComponent implements OnInit {

  answerlist: Answer[] = [];

  questionproject: Question = {
    questionid: '',
    content: '',
    date: '',
    time: '',
    employeeid: '',
    projectid: '',
    attention: '',
    lastupdate: ''
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
          this.getAnswers();
      }
      else
        this.router.navigate(['../Login']);
  }

  getAnswers() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'questionid');
    this.questionproject.questionid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Answer[]>('http://localhost:8080/project/answerlist', this.questionproject).subscribe(
      response => {
        this.answerlist = response;
        console.log(this.answerlist);
      });
    this.http1.post<Question>('http://localhost:8080/project/question', this.questionproject).subscribe(
      response => {
        this.questionproject = response;
        console.log(this.questionproject);
      });
  }

  newAnswer() {
    this.router.navigate(['../NewAnswer']);
  }

  reply($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'answerid');
    var encryptedq = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedq);
    this.router.navigate(['../ReplyList']);
  }
}
