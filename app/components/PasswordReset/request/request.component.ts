import { Component, OnInit } from '@angular/core';
import { EmpType } from '../../../modelClasses/emp-type';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  user: EmpType = null;

  model: Employee = {
    email: '',
    password: null
  }
  constructor(private http1: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    if (this.cookieService.check(encrypted))
      this.router.navigate['../Home'];
  }

  inSubmit(): void {
    // alert(this.model.email);

    this.http1.post<EmpType>('http://localhost:8080/employee/forgot', this.model).subscribe(
      res => {
        this.user = res;
        console.log(this.user);
        this.checkUser(this.user);
      }

      //  res=>{this.router.navigate(['/home'])} 
    );
  }

  public checkUser(user1: EmpType) {
    if (user1.email != null) {
      console.log(user1);
      if (user1.email === "expired") {
        alert("Account is blocked. Please contact the Administrator");
      }
      else {
        alert("Password Reset Request was submitted");
        this.router.navigate(['../Login']);
      }
    }
    else {
      alert("Email not registered");
    }

  }
}

export interface Employee {
  email: String;
  password: String;
}
