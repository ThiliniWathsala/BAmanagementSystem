import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Gradeproject } from 'src/app/modelClasses/gradeproject';
import { EmpType } from 'src/app/modelClasses/emp-type';

@Component({
  selector: 'app-gradelist',
  templateUrl: './gradelist.component.html',
  styleUrls: ['./gradelist.component.css']
})
export class GradelistComponent implements OnInit {

  listtograde: Gradeproject[] = [];

  user: EmpType = {
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

  admincheck = false;

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
      else
        this.getList();
    }
    else
      this.router.navigate(['../Login']);
  }

  getList() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.user.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Gradeproject[]>('http://localhost:8080/project/gradinglist', this.user).subscribe(
      response => {
        this.listtograde = response;
        console.log(this.listtograde);
      });
  }

  grade($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../Grade']);
  }

}
