import { Component, OnInit } from '@angular/core';
import { Display } from 'src/app/modelClasses/display';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';

@Component({
  selector: 'app-displayinterface',
  templateUrl: './displayinterface.component.html',
  styleUrls: ['./displayinterface.component.css']
})
export class DisplayinterfaceComponent implements OnInit {

  displaydetails: Display = {
    id:'',
    SRSid:'',
    datemodified:'',
    employeeid:'',
    display:'',
    attachment:'',
    specifications:'',
    connections:'',
    network:'',
    encryption:'',
    SBAcomment:'',
    PMcomment:''
  };

  currentcount:number;
  savedcount:number;

  currentsrs: SRSDetails = {
    SRSid:'',
    employeeid:'',
    input:'',
    output:'',
    user:'',
    userstory:'',
    objective:'',
    SBAcomment1:'',
    PMcomment1:'',
    systemspecification:'',
    networkrequirement:'',
    technicalrequirement:'',
    additionalnote:'',
    securitylevelspecification:'',
    SBAcomment2:'',
    PMcomment2:'',
    longsentence:0,
    uncertain:0,
    state:''
  };

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  admincheck:boolean = false;
  pm:boolean = false;
  sba:boolean = false;
  status:boolean =false;
  available:boolean = false;

  constructor(private https: HttpClient,
              private EncrDecr: EncrDecrService,
              private cookieService: CookieService,
              private router: Router,
              private uploadService: UploadFileService) { }

              ngOnInit() {
                var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
                if (this.cookieService.check(encrypted1))
                  this.admincheck = true;
              
                var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
                encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
                var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
                var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
                var prostatus = this.EncrDecr.set('123456$#@$^@1ERF', 'jba1status');
              
                if (this.cookieService.check(encrypted)) {
                  if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
                    this.router.navigate(['../NewPassword']);
                  else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
                    this.router.navigate(['../GradeAlert']);
                  else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
                    this.router.navigate(['../UserAccessOnly']);
                    else{
                    if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "PM")
                      this.pm = true;
                    else if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "SBA")
                      this.sba = true;
                    if(this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(prostatus)) === "submitted" || this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(prostatus)) === "approved" || this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(prostatus)) === "acknowledged")
                      this.status = true;
                    this.getDetails();
                    }
                }
                else
                  this.router.navigate(['../Login']);
                  
                }

                getDetails()
                {
                  var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
                  var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
                  this.displaydetails.datemodified = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
                  this.displaydetails.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
                  this.https.post<Display>('http://localhost:8080/project/getdisplay', this.displaydetails).subscribe(
                    res => {
                      this.displaydetails = res;
                      console.log(this.displaydetails);
                      if(this.displaydetails.employeeid != this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid'))))
                        this.status = true;
                      if(this.displaydetails.attachment==='available')
                        this.available = true;
                    }
                  );
                }

  save()
  {
    
    this.https.post<Display>('http://localhost:8080/project/savedisplay', this.displaydetails).subscribe(
      res => {
        this.displaydetails = res;
        console.log(this.displaydetails);
        if(this.pm || this.sba)
          alert('Your comment was saved');
        else
        {
          this.sendGrades();
          alert("Your file was saved");
        }
    this.router.navigate(['../DisplayInterface']);
      }
    );
    
  }
  
  submit()
  {
    this.https.post<Display>('http://localhost:8080/project/submitdisplay', this.displaydetails).subscribe(
      res => {
        this.displaydetails = res;
        console.log(this.displaydetails);
        this.sendGrades();
        alert("Your file was submitted");
        this.router.navigate(['../DisplayInterface']);
      }
    );
    
  } 

  downloadMyFile(){
    const link = document.createElement('a');
    var name = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'projectid')));
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../assets/'+name+'display.pdf');
    link.setAttribute('download', name+'overall.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  
  upload() {
    this.progress.percentage = 0;
    var name = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'projectid')));

    this.https.post<string>('http://localhost:8080/employee/setstaticdisplaypdf', name).subscribe(
      res => {
        this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorageDisplay(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Uploaded');
        console.log('File is completely uploaded!');
        this.router.navigate(['../Overall']);
      }
    });

    this.selectedFiles = undefined;
      }
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  checkForMarks($value)
  {
    var re1 = /might/gi; 
    var re2 = /may/gi
    var str = $value;
    if (str.search(re1) != -1 || str.search(re2) != -1) { 
       alert('Uncertenity Detected. Cannot Use may,might,etc.');
       this.currentsrs.uncertain++; 
    }   
  
    if ((str.length - this.savedcount) > 100)
    {
      alert('You have exceeded the maximum character count of 100. Please use another bullet point');
      this.currentsrs.longsentence++;
    }
  }

  onFocusDisplay($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.displaydetails.display = $value;
  }

  onFocusSpecifications($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.displaydetails.specifications = $value;
  }

  onFocusConnections($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.displaydetails.connections = $value;
  }

  onFocusNetwork($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.displaydetails.network = $value;
  }

  onFocusEncryption($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.displaydetails.encryption = $value;
  }

  onEnterDisplay($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.displaydetails.display = $value;
  }

  onEnterSpecifications($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.displaydetails.specifications = $value;
  }

  onEnterConnections($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.displaydetails.connections = $value;
  }

  onEnterNetwork($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.displaydetails.network = $value;
  }

  onEnterEncryption($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.displaydetails.encryption = $value;
  }

  sendGrades()
  {
    this.currentsrs.user = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'projectid')));;
    console.log(this.currentsrs.user);
    this.https.post<SRSDetails>('http://localhost:8080/project/savegrades1', this.currentsrs).subscribe(
      res => {
        this.currentsrs = res;
        console.log(this.currentsrs);
      }
    );
  }
  
}
