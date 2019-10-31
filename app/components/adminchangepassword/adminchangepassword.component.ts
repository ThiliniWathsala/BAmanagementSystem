import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminchangepassword',
  templateUrl: './adminchangepassword.component.html',
  styleUrls: ['./adminchangepassword.component.css']
})
export class AdminchangepasswordComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private EncrDecr: EncrDecrService,
    private https: HttpClient,
    private router: Router) { }

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


  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) != "admin")
        this.router.navigate(['../AccessRestricted']);
    }
    else
      this.router.navigate(['../Login']);
  }

  onSubmit(): void {
    if (this.model.password != this.model.email)
      alert("New Password and the Retype Password do not match");
    else {
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
      this.model.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
      this.https.post<EmpType>('http://localhost:8080/employee/resetadminpassword', this.model).subscribe(
        res => {
          this.model = res;
          if (this.model.password === 'wrong')
            alert("The current password entered is invalid");
          else {
            alert("Password change was completed successfully");
            var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
            var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'changed');
            this.cookieService.set(encrypted1, encrypted2);
            this.router.navigate(['../Home']);
          }
        }
      );
    }
  }

  onPasswordStrengthChanged(strength) {
    console.log('====================================');
    console.log('onPasswordStrengthChanged', strength);
    console.log('====================================');
  }

  // onSubmitt() {
  //   if (this.userForm.valid) {
  //     console.log('====================================');
  //     console.log('userForm', this.userForm);
  //     console.log('====================================');
  //   } else {
  //     console.log('====================================');
  //     console.log('Invalid Form');
  //     console.log('====================================');
  //     Object.keys(this.userForm.controls).forEach(key => {
  //       this.userForm.get(key).markAsDirty();
  //     });
  //   }
  // }

}
