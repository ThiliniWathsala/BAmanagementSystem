import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-others-profile-view',
  templateUrl: './others-profile-view.component.html',
  styleUrls: ['./others-profile-view.component.css']
})
export class OthersProfileViewComponent implements OnInit {

  userPro: EmpType = null;
  messagePro: EmpType;
  message: EmpType;
  newmessage: EmpType = {
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
  modelPro: ProfileElements = {
    newPassword: "",
    rePassword: ""
  };
  contact: getContact[] = [];
  NewContact;
  myContact: string[];
  i: number;
  count: number;

  image: string;

  changeImage = false;
  isPersonDetailsEditableDisabled = true; // used to control disable property in personal details
  isContactDetailsEditableDisabled = true;// control disable property in contact details
  isloginDetailsEditableDisabled = true;
  errormsg1;            // check password changes
  errormsg2;
  errormsg3;
  errormsgEnable1 = true;
  errormsgEnable2 = true;
  errormsgEnable3 = true;
  // @ViewChild("contactListt") contactList:ElementRef; // to refer each element

  selectedFile = null;
  constructor(private https: HttpClient,
    private dataPro: DataSharingService,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  //////////////////////////////////enable edit////////////////////////////////////////           
  PersonDetailsEditButtonClick($event) {     //used to edit person details
    return this.isPersonDetailsEditableDisabled = false;
  }


  ContactDetailsEditableDisabled($event) {    //used to edit contact detail
    return this.isContactDetailsEditableDisabled = false;

  }

  loginDetailsEdit($event) {
    this.isloginDetailsEditableDisabled = false;

  }
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
        this.getDetails();
    }
    else
      this.router.navigate(['../Login']);

  }

  public getDetails() {
    console.log("Starting Get Details");
    this.dataPro.employeeDetails.subscribe(message => this.newmessage.employeeid = message);
    console.log(this.newmessage.employeeid);
    this.image = '../../assets/'+this.newmessage.employeeid+'.jpg';
    this.https.post<EmpType>('http://localhost:8080/employee/otherprofile', this.newmessage).subscribe(
      response => {
        this.userPro = response;
        console.log(this.userPro);
      }
    );
  }

}
export interface ProfileElements {
  newPassword: string;
  rePassword: string;
}
export interface getContact {
  contacts: string;
}
