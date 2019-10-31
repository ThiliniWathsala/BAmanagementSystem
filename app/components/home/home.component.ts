import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpType } from '../../modelClasses/emp-type';
import { Notifications } from '../../modelClasses/notifications';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Srs } from 'src/app/modelClasses/srs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notificationnew: Notifications[] = [];
  notificationother: Notifications[] = [];

  srsdetails: Srs = {
    id:'',
    SRSid:'',
    projectid:'',
    approveddate:'',
    state:'',
    jba1status:'',
    jba2status:''
  }; 

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
  message: EmpType;

  constructor(private http1: HttpClient,
    private dataS: DataSharingService,
    private EncrDecr: EncrDecrService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else
        this.getNotifications();
    }
    else
      this.router.navigate(['../Login']);
  }

  public getNotifications() {
    console.log("Start");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.user.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    this.http1.post<Notifications[]>('http://localhost:8080/employee/notificationviewother', this.user).subscribe(
      response => {
        console.log(this.message);
        this.notificationother = response;
        console.log(this.notificationother);

        this.http1.post<Notifications[]>('http://localhost:8080/employee/notificationviewnew', this.user).subscribe(
      response => {
        console.log(this.message);
        this.notificationnew = response;
        console.log(this.notificationnew);

      }
    );

      }
    );

  }

  check(notification:Notifications) {
    if(notification.type=='QA')
    {
      var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
      var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', notification.typeid);
      this.cookieService.set(encryptedc, encryptedv);
      this.router.navigate(['../QuestionAnswer']);
    }
    else if(notification.type=='LeaveReq')
      this.router.navigate(['../LeaveApproval']);
    else if(notification.type=='LeaveResAll' || notification.type=='LeaveRes')
    {
      alert(notification.content);
      this.router.navigate(['../Home']);
    }
    else if(notification.type=='Chat')
    {
      var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
      var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', notification.typeid);
      this.cookieService.set(encrypted1,encrypted2);
      encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatempname');
      encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', notification.chatname);
      this.cookieService.set(encrypted1,encrypted2);
      this.router.navigate(['../Message']); 
    }
    else if(notification.type=='Project')
    {
      var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
      var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', notification.typeid);
      this.cookieService.set(encryptedc, encryptedv);
      this.router.navigate(['/ProjectInfo']);
    }
    else if(notification.type=='SRS')
    {
    this.srsdetails.projectid = notification.typeid;
    this.http1.post<Srs>('http://localhost:8080/project/getSRS', this.srsdetails).subscribe(
      response => {
        this.srsdetails = response;
        console.log(this.srsdetails);
      var encryptedc = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
      var encryptedv = this.EncrDecr.set('123456$#@$^@1ERF', notification.typeid);
      this.cookieService.set(encryptedc, encryptedv);
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
      this.router.navigate(['/SRSNotSubmitted']);
      });
    }
  }
}