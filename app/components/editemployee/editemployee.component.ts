import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { EmpType } from 'src/app/modelClasses/emp-type';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  userCreate: EmpType = null;
  nuser: newUser = {
    email: '',
    fname: '',
    lname: '',
    type: ''
  }

  admincheck = false;

  constructor(
    private http1: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit() {

    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if (this.cookieService.check(encrypted0))
      this.admincheck = true;

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "admin")
        this.router.navigate(['../AccessRestricted']);
      else
        this.getDetails();
    }
    else
      this.router.navigate(['../Login']);

  }

  getDetails()
  {
    this.nuser.email = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empemail')));
    this.http1.post<EmpType>('http://localhost:8080/employee/accountdetails', this.nuser).subscribe(
      res => {
        console.log(this.nuser);
        this.userCreate = res;
        console.log(this.userCreate);
        if(this.userCreate.email==null)
        {
          alert('No user registered under the entered email address');
          this.router.navigate(['../ResetBlockedAccount']);
        }
      }
    );
  }

  Submit(): void {
    // alert(this.model.email);
    console.log("Submit works");
    this.http1.post<EmpType>('http://localhost:8080/employee/editemployee', this.userCreate).subscribe(
      res => {
        console.log(this.nuser);
        this.userCreate = res;
        console.log(this.userCreate);
        alert('Successfully changed details');
        this.router.navigate(['../Home']);
      }
    );
  }

}

export interface newUser {
  email: string;
  fname: string;
  lname: string;
  type: string;
}
