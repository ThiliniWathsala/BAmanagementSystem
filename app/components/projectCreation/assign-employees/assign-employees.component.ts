import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { GetEmployees } from 'src/app/modelClasses/get-employees';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Project } from 'src/app/modelClasses/project';

@Component({
  selector: 'app-assign-employees',
  templateUrl: './assign-employees.component.html',
  styleUrls: ['./assign-employees.component.css']
})
export class AssignEmployeesComponent implements OnInit {

  constructor(private http1: HttpClient,
    private dataServe: DataSharingService,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  jbalist: string[] = [];
  sbalist: string[] = [];
  devlist: string[] = [];

  newproject: Project = {
    projectid: '',
    name: '',
    pm: '',
    lba: '',
    customerid: '',
    jba1: '',
    jba2: '',
    dev1: '',
    dev2: null,
    dev3: null,
    dev4: null,
    dev5: null,
    description: ''
  };

  admincheck = false;

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
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "PM")
        this.router.navigate(['../UserAccessOnly']);
      else
        this.getEmpList();
    }
    else
      this.router.navigate(['../Login']);

  }

  getEmpList() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.newproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log(this.newproject.projectid);
    
    this.http1.post<string[]>('http://localhost:8080/project/getavailablejba', this.newproject).subscribe(
      res => {
        this.jbalist = res;
        console.log(this.jbalist);
      }

    );
    this.http1.post<string[]>('http://localhost:8080/project/getavailablesba', this.newproject).subscribe(
      res => {
        this.sbalist = res;
        console.log(this.sbalist);
      }

    );
    this.http1.post<string[]>('http://localhost:8080/project/getavailabledev', this.newproject).subscribe(
      res => {
        this.devlist = res;
        console.log(this.devlist);
      }

    );
  }

  onSubmit() {
    var encrypt0 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.newproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypt0));
    this.http1.post<Project>('http://localhost:8080/project/projectcreationfinal', this.newproject).subscribe(
      res => {
        this.newproject = res;
        console.log(this.newproject);
        var encrypt1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
        this.cookieService.delete(encrypt1);
        alert("Project was successfully created");
        this.router.navigate(['../ProjectList']);
      }

    );
  } 

}



