import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { Notifications } from 'src/app/modelClasses/notifications';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { GetEmployees } from 'src/app/modelClasses/get-employees';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { setDefaultService } from 'selenium-webdriver/chrome';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  
  project: ProjectCustomer = {
    projectid: '',
    pm: '',
    pname: '',
    startdate: '',
    enddate: '',
    description: '',
    email: '',
    cname: '',
    contact: ''
  }

  admincheck = false;

  min1date: string;
  min2date: string;

  // datePickerConfig: Partial<BsDatepickerConfig>

  constructor(private http1: HttpClient,
    private dataS: DataSharingService,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) {
    //   this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',
    //   minDate: new Date(2019,7,24),
    //   maxDate: new Date(2019,7,30),
    // });
     }

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
        this.setMin1Date();
    }
    else
      this.router.navigate(['../Login']);
  }

  setMin1Date()
  {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    this.min1date = yyyy + '-' + mm + '-' + dd;
    this.min2date = yyyy + '-' + mm + '-' + dd;
    // document.write(today);
    
  }

  setMin2Date()
  {
      this.min2date = this.project.startdate;
  }


  onSubmit() {
    var encrypt0 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.project.pm = this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypt0));
    // this.project.startdate = "20/04/2019";
    // this.project.enddate = "20/03/2020";
    this.http1.post<ProjectCustomer>('http://localhost:8080/project/projectcreation', this.project).subscribe(
      res => {
        this.project = res;
        console.log(this.project);
        var encrypt1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
        var encrypt2 = this.EncrDecr.set('123456$#@$^@1ERF', this.project.projectid);
        this.cookieService.set(encrypt1, encrypt2);
        this.router.navigate(['../AssignEmployees']);
      }

    );
    alert(this.project.startdate);
    alert(this.project.enddate);
  }

}

export interface ProjectCustomer {
  projectid: string;
  pm: string;
  pname: string;
  startdate: string;
  enddate: string;
  description: string;
  email: string;
  cname: string;
  contact: string;
}
