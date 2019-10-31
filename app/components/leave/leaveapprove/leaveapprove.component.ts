import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { EmpCal } from 'src/app/modelClasses/emp-cal';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Router } from '@angular/router';
import { Calender } from 'src/app/modelClasses/calender';

@Component({
  selector: 'app-leaveapprove',
  templateUrl: './leaveapprove.component.html',
  styleUrls: ['./leaveapprove.component.css']
})
export class LeaveapproveComponent implements OnInit {

  leavelist: EmpCal[] = [];

  model: EmpType = {
    employeeid: '',
    fname: '',
    lname: '',
    password: '',
    type: '',
    email: '',
    username: '',
    contact1: '',
    contact2: '',
    addressno: '',
    street: '',
    city: '',
    status: '',
    about: '',
    image: '',
    passstatus: '',
    gradestatus: ''
  }

  cal:Calender={
    leaveid:'',
    pm:'',
    ba:'',
    startdate:'',
    enddate:'',
    reason:'',
    status:'',
  }

  admincheck = false;

  constructor(private cookieService: CookieService,
    private http: HttpClient,
    private EncrDecr: EncrDecrService,
    private router: Router) { }

  ngOnInit() {

    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if (this.cookieService.check(encrypted0))
      this.admincheck = true;

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
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
        this.getLeaveList();
    }
    else
      this.router.navigate(['../Login']);
  }

  public getLeaveList() {

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.model.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log("Start LeaveList");
    console.log(this.model.employeeid);

    this.http.post<EmpCal[]>('http://localhost:8080/employee/leavelist', this.model).subscribe(
      response => {
        this.leavelist = response;
        console.log(this.leavelist);
      }
    );

  }

  acknowledge($value)
  {
    this.cal.leaveid = $value;
    console.log($value);
    
    this.http.post<Calender>('http://localhost:8080/employee/approveleave', this.cal).subscribe(
      response => {
        this.cal = response;
        console.log(this.leavelist);
        alert('Leave Acknowledged');
        this.getLeaveList();
      }
    );
  }

}
