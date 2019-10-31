import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServeService } from 'src/app/services/http-serve.service';
import { FormsModule } from '@angular/forms';
import { error } from 'util';
import { Router } from '@angular/router';
import { EmpType } from '../../modelClasses/emp-type';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLog: EmpType = null;

  model: Employee = {
    email: '',
    password: ''
  }
  message: EmpType;
  public error = null;
  // public  isDisabled = ;
  // constructor(private http1:HttpServeService) { }
  constructor(private http1: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private dataServe: DataSharingService,
    private EncrDecr: EncrDecrService) { }
  ngOnInit() {
    // this.getEmployee();
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    if (this.cookieService.check(encrypted))
      this.router.navigate(['../Home']);
    // this.dataServe.employeeDetails.subscribe( message=>this.message = message);

  }

  onSubmit(): void {
    // alert(this.model.email);
    this.http1.post<EmpType>('http://localhost:8080/employee/loginnow', this.model).subscribe(
      res => {
        console.log(this.model);
        this.userLog = res;
        this.checkUser(this.userLog);
      }
    );
  }
  public checkUser(user1: EmpType) {
    if (user1.email != null) {
      if (user1.email === "expired") {
        alert("Account is blocked. Please contact the Administrator");
      }
      else {
        this.dataServe.setEmployeeDetails(user1);
        console.log(user1);
        var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
        var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', user1.type);
        this.cookieService.set(encrypted1, encrypted2);
        encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
        encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', user1.employeeid);
        this.cookieService.set(encrypted1, encrypted2);
        encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'empname');
        encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', user1.fname + ' ' + user1.lname);
        this.cookieService.set(encrypted1, encrypted2);
        encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
        encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', user1.passstatus);
        this.cookieService.set(encrypted1, encrypted2);
        encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
        encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', user1.gradestatus);
        this.cookieService.set(encrypted1, encrypted2);
        if (user1.email === 'admin') {
          encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
          encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'yes');
          this.cookieService.set(encrypted1, encrypted2);
          encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
          encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'done');
          this.cookieService.set(encrypted1, encrypted2);
          encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
          encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'changed');
          this.cookieService.set(encrypted1, encrypted2);
        }
        console.log(user1.type);
        
        if(user1.type==='admin')
          this.router.navigate(['../Home']);
        else
        this.router.navigate(['../OngoingProjects']);
        
      }
    }
    else {
      alert("Invalid Email or Password");
    }

  }
  public getEmployee() {
    console.log("Start");
    this.http1.get<EmpType>('http://localhost:8080/employee/loginnow').subscribe(
      response => {
        this.userLog = response;
        console.log(this.userLog);
      }
    );

  }

  errorHandling(error) {
    this.error = error.error.error; //check the cascading number of errors
  }

}
export interface Employee {
  email: string;
  password: string;
}