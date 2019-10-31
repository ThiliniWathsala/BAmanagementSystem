import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/modelClasses/question';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QaComponent implements OnInit {

  questionlist: Question[] = [];

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

  other:boolean = false;

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
      {
        this.getQuestions();
        
        if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "PM" && this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "Dev")
          this.other = true;
        
      }
        
    }
    else
      this.router.navigate(['../Login']);
  }

  getQuestions() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.questionproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Question[]>('http://localhost:8080/project/questionlist', this.questionproject).subscribe(
      response => {
        this.questionlist = response;
        console.log(this.questionlist);
        this.http1.post<Question>('http://localhost:8080/project/projectname', this.questionproject).subscribe(
      response => {
        this.questionproject = response;
        console.log(this.questionproject);
      });
      });
    
  }

  attentionNow($value) {
    this.questionproject.questionid = $value;
    console.log($value);
    
    this.http1.post<Question>('http://localhost:8080/project/attentionquestion', this.questionproject).subscribe(
      response => {
        this.questionproject = response;
        console.log(this.questionproject);
        alert("The question was highlighted");
        this.getQuestions();
      });
  }

  showAnswers($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'questionid');
    var encryptedq = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedq);
    this.router.navigate(['../AnswerList']);
  }

  newQuestion() {
    this.router.navigate(['../NewQuestion']);
  }
}
