import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Overall } from 'src/app/modelClasses/overall';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';
@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {

  overalldetails: Overall={
    id:'',
    SRSid:'',
    datemodified:'',
    employeeid:'',
    type:'',
    description:'',
    diagram1:'',
    specification:'',
    diagram2:'',
    usercase:'',
    software:'',
    hardware:'',
    constraints:'',
    documents:'',
    assumptions:'',
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

  constructor(private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService,
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
    this.overalldetails.datemodified = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.overalldetails.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Overall>('http://localhost:8080/project/getoverall', this.overalldetails).subscribe(
      res => {
        this.overalldetails = res;
        console.log(this.overalldetails);
        if(this.overalldetails.employeeid != this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid'))))
          this.status = true;
        if(this.overalldetails.diagram1==='available')
          this.available = true;
      }
    );
  }

  save()
  {
    this.https.post<Overall>('http://localhost:8080/project/saveoverall', this.overalldetails).subscribe(
      res => {
        this.overalldetails = res;
        console.log(this.overalldetails);
        if(this.pm || this.sba)
          alert('Your comment was saved');
        else
        {
          this.sendGrades();
          alert("Your file was saved");
        }
    this.router.navigate(['../Overall']);
      }
    );
    
  }
  
  submit()
  {
    this.https.post<Overall>('http://localhost:8080/project/submitoverall', this.overalldetails).subscribe(
      res => {
        this.overalldetails = res;
        console.log(this.overalldetails);
        this.sendGrades();
        alert("Your file was submitted");
        this.router.navigate(['../Overall']);
      }
    );
    
  } 

  downloadMyFile(){
    const link = document.createElement('a');
    var name = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'projectid')));
    link.setAttribute('target', '_blank');
    console.log('../../assets/'+name+'overall.pdf');
    link.setAttribute('href', '../../assets/'+name+'overall.pdf');
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

    this.https.post<string>('http://localhost:8080/employee/setstaticoverallpdf', name).subscribe(
      res => {
        this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorageOverall(this.currentFileUpload).subscribe(event => {
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

  onFocusDescription($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.description = $value;
  }

  onEnterDescription($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.description = $value;
  }

  onFocusSpecification($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.specification = $value;
  }

  onEnterSpecification($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.specification = $value;
  }

  onFocusUsercase($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.usercase = $value;
  }

  onEnterUsercase($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.usercase = $value;
  }

  onFocusSoftware($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.software = $value;
  }

  onEnterSoftware($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.software = $value;
  }

  onFocusHardware($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.hardware = $value;
  }

  onEnterHardware($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.hardware = $value;
  }

  onFocusConstraints($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.constraints = $value;
  }

  onEnterConstraints($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.constraints = $value;
  }

  onFocusDocuments($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.documents = $value;
  }

  onEnterDocuments($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.documents = $value;
  }

  onFocusAssumptions($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.overalldetails.assumptions = $value;
  }

  onEnterAssumptions($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.overalldetails.assumptions = $value;
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
