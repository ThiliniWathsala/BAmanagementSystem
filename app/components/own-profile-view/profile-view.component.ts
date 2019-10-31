import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { HttpClient } from '@angular/common/http'
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

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

  admincheck = false;
  admin = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  // @ViewChild("contactListt") contactList:ElementRef; // to refer each element

  selectedFile = null;
  constructor(private https: HttpClient,
    private dataPro: DataSharingService,
    private router: Router,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService,
    private uploadService: UploadFileService) { }

  //////////////////////////////////enable edit////////////////////////////////////////           
  PersonDetailsEditButtonClick($event) {     //used to edit person details
    return this.isPersonDetailsEditableDisabled = false;
  }


  ContactDetailsEditableDisabled($event) {    //used to edit contact detail
    return this.isContactDetailsEditableDisabled = false;

  }

  loginDetailsEdit($event) {
    var encrypted00 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
    if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted00)) === 'admin')
      this.router.navigate(['../AdminChangePassword']);

    this.isloginDetailsEditableDisabled = false;

  }
  ngOnInit() {
    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');

    if (this.cookieService.check(encrypted0))
      this.admincheck = true;

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else {
        this.getDetails();
      }
    }
    else
      this.router.navigate(['../Login']);

  }

  public getDetails() {
    console.log("Starting Get Details");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    console.log(this.cookieService.get(encrypted));
    this.newmessage.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log(this.newmessage.employeeid);
    this.image = '../../assets/'+this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted))+'.jpg';
    this.https.post<EmpType>('http://localhost:8080/employee/getempdetails', this.newmessage).subscribe(
      response => {
        this.userPro = response;
        console.log(this.userPro);
      }
    );
  }

  change($event) {
    this.changeImage = true;
  }

  checkPassword() {
    console.log(this.modelPro);
    if ((this.modelPro.newPassword).length >= 8) {
      //  this.errormsgDissable=true;
      if (this.modelPro.rePassword === this.modelPro.newPassword) {
        console.log("true");
        //  this.errormsgDissable=true;
        this.userPro.password = this.modelPro.newPassword;
        console.log(this.userPro.password);

        this.isloginDetailsEditableDisabled = true;

        console.log("Sent:" + this.userPro);
        this.https.post<EmpType>('http://localhost:8080/employee/editprofile/accountdetails', this.userPro).subscribe(
          res => {
            this.message = res;
            console.log(this.message);
          }
        );
        window.location.reload();
      }
      else {
        this.errormsgEnable3 = false;
        this.errormsg3 = "error: confirm password does not match with new password";
        this.errormsgEnable2 = true;
      }
    }
    else {
      this.errormsgEnable2 = false;
      this.errormsg2 = "error: Characters are less than 8";
    }
  }

  changePersonalDetails(event) {

    console.log("Sent:" + this.userPro);
    this.https.post<EmpType>('http://localhost:8080/employee/editprofile/personaldetails', this.userPro).subscribe(
      res => {
        this.message = res;
        console.log(this.message);
      }
    );
    window.location.reload();
  }

  changeContactDetails(event) {

    console.log("Sent:" + this.userPro);
    this.https.post<EmpType>('http://localhost:8080/employee/editprofile/contactdetails', this.userPro).subscribe(
      res => {
        this.message = res;
        console.log(this.message);
      }
    );
    window.location.reload();
  }

  saveImage(event) {

    // console.log("Sent:"+this.userPro);
    console.log(this.userPro.image);
    console.log(this.userPro);
    this.https.post<EmpType>('http://localhost:8080/employee/editprofile/image', this.selectedFile).subscribe(
      res => {
        this.message = res;
        console.log(this.message);
      }
    );
    window.location.reload();
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  
  upload() {
    this.progress.percentage = 0;
    var empid =  this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid')));
    this.https.post<string>('http://localhost:8080/employee/setstaticimage', empid).subscribe(
      res => {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  remain()
  {
    this.changeImage = false;
    this.isPersonDetailsEditableDisabled = true; 
    this.isContactDetailsEditableDisabled = true;
    this.isloginDetailsEditableDisabled = true;
  }

}
export interface ProfileElements {
  newPassword: string;
  rePassword: string;
}
export interface getContact {
  contacts: string;
}

