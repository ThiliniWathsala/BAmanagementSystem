import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { HttpClient } from '@angular/common/http';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';
import { Project } from 'src/app/modelClasses/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sbasrs',
  templateUrl: './sbasrs.component.html',
  styleUrls: ['./sbasrs.component.css']
})
export class SbasrsComponent implements OnInit {

  constructor(private cookieService:CookieService,
    private EncrDecr:EncrDecrService,
    private https:HttpClient,
    private router: Router) { }

currentsrs: SRSDetails = {
SRSid:'',
employeeid:'',
input:'',
output:'',
user:'',
userstory:'',
objective:'',
SBAcomment1:'',
PMcomment1:'',
systemspecification:'',
networkrequirement:'',
technicalrequirement:'',
additionalnote:'',
securitylevelspecification:'',
SBAcomment2:'',
PMcomment2:'',
longsentence:0,
uncertain:0,
state:''
};

currentsrs1: SRSDetails = {
  SRSid:'',
  employeeid:'',
  input:'',
  output:'',
  user:'',
  userstory:'',
  objective:'',
  SBAcomment1:'',
  PMcomment1:'',
  systemspecification:'',
  networkrequirement:'',
  technicalrequirement:'',
  additionalnote:'',
  securitylevelspecification:'',
  SBAcomment2:'',
  PMcomment2:'',
  longsentence:0,
  uncertain:0,
  state:''
  };

  currentsrs2: SRSDetails = {
    SRSid:'',
    employeeid:'',
    input:'',
    output:'',
    user:'',
    userstory:'',
    objective:'',
    SBAcomment1:'',
    PMcomment1:'',
    systemspecification:'',
    networkrequirement:'',
    technicalrequirement:'',
    additionalnote:'',
    securitylevelspecification:'',
    SBAcomment2:'',
    PMcomment2:'',
    longsentence:0,
    uncertain:0,
    state:''
    };

currentproject: Project = {
projectid:'',
name:'',
pm:'',
lba:'',
customerid:'',
jba1:'',
jba2:'',
dev1:'',
dev2:'',
dev3:'',
dev4:'',
dev5:'',
description:''  
};

currentcount:number;
savedcount:number;
sec1:string;
sec2:string;
enable:boolean;

admincheck:boolean = false;

state:boolean = false;

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
    else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "SBA")
      this.router.navigate(['../UserAccessOnly']);
      else
      this.getProjectDetails();
  }
  else
    this.router.navigate(['../Login']);
}

getProjectDetails()
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<Project>('http://localhost:8080/project/detailsforsrs', this.currentproject).subscribe(
      response => {
        this.currentproject = response;
        console.log(this.currentproject);
        this.https.post<SRSDetails>('http://localhost:8080/project/detailsforsrssec1', this.currentproject).subscribe(
        response => {
          this.currentsrs1 = response;
          console.log(this.currentsrs1);
          this.sec1 = this.currentsrs1.employeeid;
          this.https.post<SRSDetails>('http://localhost:8080/project/detailsforsrssec2', this.currentproject).subscribe(
      response => {
        this.currentsrs2 = response;
        console.log(this.currentsrs2);
        this.sec2 = this.currentsrs2.employeeid;
        this.https.post<SRSDetails>('http://localhost:8080/project/getstate', this.currentproject).subscribe(
      response => {
        this.currentsrs = response;
        console.log(this.currentsrs);
        encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
      
      if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted))===this.sec1)
      {this.enable = true;
      console.log('condition working');
      }
          
      else
          this.enable = false;
      
     if(this.currentsrs.state===' ' || this.currentsrs.state==='' || this.currentsrs.state==null )
        this.state = false;

        
      });
      });
        });
      }); 
    
  }

approve()
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.currentsrs.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<SRSDetails>('http://localhost:8080/project/approveSRS', this.currentsrs).subscribe(
      response => {
        this.currentsrs = response;
        console.log(this.currentsrs);
        alert('SRS was successfully Accepted');
      this.router.navigate(['../ProjectList']);
      });
      
  }

  reject()
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.currentsrs.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<SRSDetails>('http://localhost:8080/project/rejectSRS', this.currentsrs).subscribe(
      response => {
        this.currentsrs = response;
        console.log(this.currentsrs);
        alert('SRS was successfully Rejected');
      this.router.navigate(['../ProjectList']);
      });
      
  }

  saveComments()
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    console.log(this.currentsrs1.SBAcomment1);
    console.log(this.currentsrs2.SBAcomment2);
    this.currentsrs1.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<SRSDetails>('http://localhost:8080/project/saveSBAComment1', this.currentsrs1).subscribe(
      response => {
        this.currentsrs1 = response;
        console.log(this.currentsrs1);
        this.currentsrs2.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<SRSDetails>('http://localhost:8080/project/saveSBAComment2', this.currentsrs2).subscribe(
      response => {
        this.currentsrs2 = response;
        console.log(this.currentsrs2);
        this.getProjectDetails();
      });
      });
      
  }

}
