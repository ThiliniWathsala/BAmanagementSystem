import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

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

  constructor(private https: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');

    if (this.cookieService.check(encrypted)) {
      // if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
      //   this.router.navigate(['/AdminChangePassword']);
    }
    else
      this.router.navigate(['../Login']);
  }

  onSubmit(): void {
    // alert(this.model.email);
    if (this.model.email === this.model.password) {
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
      this.model.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
      this.https.post<EmpType>('http://localhost:8080/employee/newpassword', this.model).subscribe(
        res => {
          console.log(this.model);
          this.model = res;
        }
      );
      alert("Password changed Successfully");
      var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
      var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'changed');
      this.cookieService.set(encrypted1, encrypted2);
      this.router.navigate(['../Home']);
    }
    else
      alert("New Password and the Retype Password do not match");
  }
}
