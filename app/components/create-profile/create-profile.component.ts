import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';
import { EmpType } from '../../modelClasses/emp-type';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

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
    }
    else
      this.router.navigate(['../Login']);
  }

  Submit(): void {
    // alert(this.model.email);
    console.log("Submit works");
    this.http1.post<EmpType>('http://localhost:8080/employee/register', this.nuser).subscribe(
      res => {
        console.log(this.nuser);
        this.userCreate = res;
        console.log(this.userCreate);
        this.checkEmail();
      }
    );
  }

  checkEmail() {
    if (this.userCreate.email=== null) {
      alert("Email entered is already registered!");
    }
    else {
      alert("User Creation Successful");
      location.reload();
    }
  }
}
export interface newUser {
  email: string;
  fname: string;
  lname: string;
  type: string;
}
