import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Project } from 'src/app/modelClasses/project';
import { Customer } from 'src/app/modelClasses/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  constructor(private cookieService:CookieService,
              private https:HttpClient,
              private EncrDecr: EncrDecrService,
              private router:Router) { }

  currentproject: Project = {
    projectid:'',
    name:'',
    pm:'',
    lba:'',
    customerid:'',
    jba1:'',
    jba2:'',
    dev1:'',
    dev2:'',
    dev3:'',
    dev4:'',
    dev5:'',
    description:''
  };

  currentcustomer:Customer = {
    customerid:'',
    email:'',
    name:'',
    contact1:'',
    contact2:''
  };

  admincheck: boolean = false;
  other:boolean = false;

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
      this.other = true;
      else
      this.getCustomerDetails();
  }
  else
    this.router.navigate(['../Login']);
  }

  getCustomerDetails()
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.https.post<Customer>('http://localhost:8080/project/getcustomer', this.currentproject).subscribe(
    response => {
    this.currentcustomer = response;
    console.log(this.currentcustomer);
    });    
  }

  onSubmit()
  {
    this.https.post<Customer>('http://localhost:8080/project/editcustomer', this.currentcustomer).subscribe(
    response => {
    this.currentcustomer = response;
    console.log(this.currentcustomer);
    }); 
    this.getCustomerDetails();
  }

}
