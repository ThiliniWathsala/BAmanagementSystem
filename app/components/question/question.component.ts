import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Question } from 'src/app/modelClasses/question';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

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
        this.getProjectName();
    }
    else
      this.router.navigate(['../Login']);
  }

  getProjectName(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/projectname', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
      }
    );
  }

  onSubmit(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.currentquestion.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Question>('http://localhost:8080/project/newquestion', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
        alert("Your question was submitted");
    this.router.navigate(['../QuestionAnswer']);
      }
    );
    
  }

}
