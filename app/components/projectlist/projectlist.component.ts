import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Project } from 'src/app/modelClasses/project';
import { HttpClient } from '@angular/common/http';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Router } from '@angular/router';
import { Srs } from 'src/app/modelClasses/srs';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {

  projectlist: Project[] = [];

  pro: Project;

  srsdetails: Srs = {
    id:'',
    SRSid:'',
    projectid:'',
    approveddate:'',
    state:'',
    jba1status:'',
    jba2status:''
  }; 

  modelproject: Project = {
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

  admincheck = false;

  other:boolean = false;
  jba:boolean = false;

  constructor(private cookieService: CookieService,
    private https: HttpClient,
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
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
        this.router.navigate(['../UserAccessOnly']);
      else
      {
        this.getProjects();
        if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "PM")
          this.other = true;
        if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "JBA")
          this.jba = true;
      }
        
    }
    else
      this.router.navigate(['../Login']);

  }

  public getProjects() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.model.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log("Starting ProjectList");
    this.https.post<Project[]>('http://localhost:8080/project/projectlist', this.model).subscribe(
      response => {
        this.projectlist = response;
        console.log(this.projectlist);
      }
    );

    // this.https.post<Project>('http://localhost:8080/employee/projectinfo', null).subscribe(
    //   response => {
    //     this.pro = response;
    //     console.log(this.pro);
    //   }
    // );
  }

  view($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../ProjectInfo']);

  }

  qa($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../QuestionAnswer']);
  }

  srs($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.srsdetails.projectid = $value;
    this.https.post<Srs>('http://localhost:8080/project/getSRS', this.srsdetails).subscribe(
      response => {
        this.srsdetails = response;
        console.log(this.srsdetails);
        encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'status');
        encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', this.srsdetails.state);
        this.cookieService.set(encryptedc, encryptedv);
        encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'jba1status');
        encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', this.srsdetails.jba1status);
        this.cookieService.set(encryptedc, encryptedv);
        encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'jba2status');
        encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', this.srsdetails.jba2status);
        this.cookieService.set(encryptedc, encryptedv);
        encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'option');
        encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', 'SRSOptions');
        this.cookieService.set(encryptedc, encryptedv);
        this.router.navigate(['../SRSNotSubmitted']);
      }
    );  
  }

  customer($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../EditCustomerDetails']);
  }

  grade($value) {
    var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', $value);
    this.cookieService.set(encryptedc, encryptedv);
    this.router.navigate(['../Grade']);
  }

  endProject($value) {
    this.modelproject.projectid = $value;
    this.https.post<Project>('http://localhost:8080/project/endproject', this.modelproject).subscribe(
      response => {
        this.modelproject = response;
        console.log(this.modelproject);
        alert('Project was successfully ended');
    this.getProjects();
      });

    
  }
}
