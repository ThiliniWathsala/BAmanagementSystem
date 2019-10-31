import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { ChatMessage } from 'src/app/modelClasses/chat-message';

@Component({
  selector: 'app-searchemp',
  templateUrl: './searchemp.component.html',
  styleUrls: ['./searchemp.component.css']
})
export class SearchempComponent implements OnInit {

  model: Employee = {
    fname: ''
  }

  chatMessage: ChatMessage = {
    empid: '',
    empidowner: '',
    chatid: '',
    empname: '',
    ownername: ''
  };

  employeesearchedlist: EmpType[] = [];

  searchemp: EmpType = {
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

  constructor(private dataS: DataSharingService,
    private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {

    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if (this.cookieService.check(encrypted0))
      this.admincheck = true;

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else
        this.getSearchedEmps();
    }
    else
      this.router.navigate(['../Login']);
  }

  public getSearchedEmps() {
    var search = this.EncrDecr.set('123456$#@$^@1ERF', 'SearchEmployee');
    this.searchemp.fname = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(search));
    search = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.searchemp.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(search));
    console.log("Starting SearchedEmplist");
    console.log(this.searchemp.fname);
    this.https.post<EmpType[]>('http://localhost:8080/employee/searchemployee', this.searchemp).subscribe(
      response => {
        this.employeesearchedlist = response;
        console.log(this.employeesearchedlist);
      }
    );
  }

  onSubmit(): void {
    var search = this.EncrDecr.set('123456$#@$^@1ERF', 'SearchEmployee');
    var searchname = this.EncrDecr.set('123456$#@$^@1ERF', this.model.fname);
    this.cookieService.set(search, searchname);
    this.ngOnInit();
  }

  viewProfile($empid) {
    console.log($empid);
    this.dataS.setEmployeeDetails($empid);
    this.router.navigate(['../OtherProfileView']);
  }

  chatNow($value) {
    this.chatMessage.empid = $value;
    var enc = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.chatMessage.empidowner = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(enc));
    console.log(this.chatMessage);

    this.https.post<ChatMessage>('http://localhost:8080/employee/messagelistfromsearch', this.chatMessage).subscribe(
      response => {
        this.chatMessage = response;
        console.log(this.chatMessage);
        var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
        var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', this.chatMessage.chatid);
        this.cookieService.set(encrypted1, encrypted2);
        encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatempname');
        encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', this.chatMessage.empname);
        this.cookieService.set(encrypted1, encrypted2);
        this.router.navigate(['../Message']);
      }
    );
  }

}

export interface Employee {
  fname: string;
}