import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modelClasses/project';
import { Grade } from 'src/app/modelClasses/grade';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  currentproject: Project = {
    projectid: '',
    name: '',
    pm: '',
    lba: '',
    customerid: '',
    jba1: '',
    jba2: '',
    dev1: '',
    dev2: '',
    dev3: '',
    dev4: '',
    dev5: '',
    description: ''
  };

  checkproject: Project = {
    projectid: '',
    name: '',
    pm: '',
    lba: '',
    customerid: '',
    jba1: '',
    jba2: '',
    dev1: '',
    dev2: '',
    dev3: '',
    dev4: '',
    dev5: '',
    description: ''
  };

  devtypeproject: Project = {
    projectid: '',
    name: '',
    pm: '',
    lba: '',
    customerid: '',
    jba1: '',
    jba2: '',
    dev1: '',
    dev2: '',
    dev3: '',
    dev4: '',
    dev5: '',
    description: ''
  };

  projectgrade: Grade = {
    projectid: '',
    customergrade: '',
    systemgrade1: '',
    systemgrade2: '',
    sbagrade1: '',
    sbagrade2: '',
    pmgrade: '',
    qagrade: '',
    devgrade: '',
    devcount: '',
    status: '',
    dev1grade: '',
    dev2grade: '',
    dev3grade: '',
    dev4grade: '',
    dev5grade: '',
    employeeid: '',
  };

  admincheck = false;

  pm:boolean = false;
  sba:boolean = false;
  dev1:boolean = false;
  dev2:boolean = false;
  dev3:boolean = false;
  dev4:boolean = false;
  dev5:boolean = false;

  dev:string = null;

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
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
        this.router.navigate(['../UserAccessOnly']);
      else {
        this.check();
        this.getDetails();
      }
    }
    else
      this.router.navigate(['../Login']);
  }

  check() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.checkproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.checkproject.name = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Project>('http://localhost:8080/project/checkgraded', this.checkproject).subscribe(
      response => {
        this.checkproject = response;
        console.log(this.currentproject);
        if (this.checkproject.projectid === 'graded') {
          alert("You have already graded this project");
          this.router.navigate(['../ProjectList']);
        }
      });
  }

  getDetails() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Project>('http://localhost:8080/project/projectempdetails', this.currentproject).subscribe(
      response => {
        this.currentproject = response;
        console.log(this.currentproject);
        var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
        if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted0))==='PM')
          this.pm = true; 
        else if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted0))==='SBA')
          this.sba = true;
          else if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted0))==='Dev')
           {
            var x = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
            this.devtypeproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(x));
            x = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
            this.devtypeproject.name = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(x));
            this.http1.post<Project>('http://localhost:8080/project/devposition', this.devtypeproject).subscribe(
              response => {
                this.devtypeproject = response;
                if(this.devtypeproject.dev1==='dev1')
                  this.dev1 = true;
                  else if(this.devtypeproject.dev1==='dev2')
                  this.dev2 = true;
                  else if(this.devtypeproject.dev1==='dev3')
                  this.dev3 = true;
                  else if(this.devtypeproject.dev1==='dev4')
                  this.dev4 = true;
                  else if(this.devtypeproject.dev1==='dev5')
                  this.dev5 = true;
           }); 
          }
      });
  }

  onSubmit(): void {
    this.projectgrade.projectid = this.currentproject.projectid;
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.projectgrade.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log(this.projectgrade.customergrade);
    console.log(this.projectgrade.pmgrade);
    this.http1.post<Grade>('http://localhost:8080/project/getgrades', this.projectgrade).subscribe(
      res => {
        this.projectgrade = res;
        if(this.projectgrade.employeeid==="done")
        {
          var enc1 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
          var enc2 = this.EncrDecr.set('123456$#@$^@1ERF', 'done');
          this.cookieService.set(enc1,enc2);
        }
        this.router.navigate(['../ProjectList']);
      }
    );
  }

}
