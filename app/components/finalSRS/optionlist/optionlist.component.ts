import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Question } from 'src/app/modelClasses/question';

@Component({
  selector: 'app-optionlist',
  templateUrl: './optionlist.component.html',
  styleUrls: ['./optionlist.component.css']
})
export class OptionlistComponent implements OnInit {

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

  admincheck:boolean = false;
  pm:boolean = false;
  sba:boolean = false;
  status:boolean = false;

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
  var prostatus = this.EncrDecr.set('123456$#@$^@1ERF', 'status');

  if (this.cookieService.check(encrypted)) {
    if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
      this.router.navigate(['../NewPassword']);
    else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
      this.router.navigate(['../GradeAlert']);
    else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
      this.router.navigate(['../UserAccessOnly']);
      else{
      if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "PM")
        this.pm = true;
      else if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "SBA")
        this.sba = true;
      if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(prostatus)) === "acknowledged")
        this.status = true;
      this.getProjectName();
      }
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

  introduction()
  {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'Introduction');
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../SRSNotSubmitted']);
  }

  overall()
  {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'Overall');
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../SRSNotSubmitted']);
  }

  nonfunctional()
  {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'NonFunctional');
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../SRSNotSubmitted']);
  }

  systemfeatures()
  {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'SystemFeatures');
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../SRSNotSubmitted']);
  }

  display()
  {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'DisplayInterface');
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../SRSNotSubmitted']);
  }

  acknowledge()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/acknowledgeSRS', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
        alert('SRS Acknowledged');
        this.router.navigate(['../ProjectList']);
      }
    );
  }

  email()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/manualmail', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
        alert('Email Sent to the Customer');
        this.router.navigate(['../ProjectList']);
      }
    );
  }

  approve()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/approveSRS', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
        alert('SRS Approved');
        this.router.navigate(['../ProjectList']);
      }
    );
  }

  reject()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentquestion.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Question>('http://localhost:8080/project/rejectSRS', this.currentquestion).subscribe(
      res => {
        this.currentquestion = res;
        console.log(this.currentquestion);
        alert('SRS Rejected');
        this.router.navigate(['../ProjectList']);
      }
    );
  }

}
