import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/modelClasses/answer';
import { Question } from 'src/app/modelClasses/question';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  newanswer: Answer = {
    answerid: '',
    questionid: '',
    content: '',
    date: '',
    time: '',
    employeeid: ''
  };

  currentquestion: Question = {
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
        this.getQuestion();
    }
    else
      this.router.navigate(['../Login']);
  }

  getQuestion(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'questionid');
    this.currentquestion.questionid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/question', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
      }
    );
  }

  onSubmit(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'questionid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.newanswer.questionid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.newanswer.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Answer>('http://localhost:8080/project/newanswer', this.newanswer).subscribe(
      res => {
        this.newanswer = res;
        console.log(this.newanswer);
        alert("Your answer was submitted");
    this.router.navigate(['../AnswerList']);
      }
    );
    
  }

}
