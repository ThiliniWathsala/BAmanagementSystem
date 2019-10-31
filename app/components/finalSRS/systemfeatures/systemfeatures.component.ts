import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { System } from 'src/app/modelClasses/system';
import { Systemfeatures } from 'src/app/modelClasses/systemfeatures';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';

@Component({
  selector: 'app-systemfeatures',
  templateUrl: './systemfeatures.component.html',
  styleUrls: ['./systemfeatures.component.css']
})
export class SystemfeaturesComponent implements OnInit {

  editField: string;
  i:number = 0;

  featureList: Array<any> = [
    
  ];

  featuredetails: System={
    description:'',
    priority:'',
    response:'',
    requirement:'',
    projectid:''
  };

  features: Systemfeatures={
    id:'',
    SRSid:'',
    datemodified:'',
    employeeid:'',
    SBAcomment:'',
    PMcomment:'',
    featureset:[]
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

  admincheck:boolean = false;
  pm:boolean = false;
  sba:boolean = false;
  status:boolean =false;
  available:boolean = false;

  constructor(private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

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
    this.features.datemodified = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.features.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Systemfeatures>('http://localhost:8080/project/getfeatures', this.features).subscribe(
      res => {
        this.features = res;
        console.log(this.features);
        if(this.features.employeeid != this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid'))))
          this.status = true;
          this.features.featureset.forEach(element => {
               this.featureList.push(element);
          });
        // this.featureList.push(this.features.featureset);
      }
    );
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.featureList[id][property] = editField;
  }

  remove(id: any) {
    this.featureList.splice(id, 1);
  }

  add() {

    var p;
    if(this.featuredetails.priority=='High')
      p = 1;
    else if(this.featuredetails.priority=='Medium')
      p = 2;
    else
      p = 3;

    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));

      const feature = { id: this.i, pri: p, priority: this.featuredetails.priority, description: this.featuredetails.description, response: this.featuredetails.response, requirement: this.featuredetails.requirement, SRSid:projectid};
      this.featureList.push(feature);
      this.featureList.sort(function(a, b){return a.pri - b.pri});
      this.i++;
      this.featuredetails.priority = '';
      this.featuredetails.description = '';
      this.featuredetails.requirement = '';
      this.featuredetails.response = '';
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  save()
  {
    this.features.featureset = this.featureList;
    this.https.post<Systemfeatures>('http://localhost:8080/project/savefeatures', this.features).subscribe(
      res => {
        this.features = res;
        console.log(this.features);
        if(this.pm || this.sba)
          alert('Your comment was saved');
        else
        {
          this.sendGrades();
          alert("Your file was saved");
        }
    this.router.navigate(['../SystemFeatures']);
      }
    );
    
  }
  
  submit()
  {
    this.features.featureset = this.featureList;
    this.https.post<Systemfeatures>('http://localhost:8080/project/submitfeatures', this.features).subscribe(
      res => {
        this.features = res;
        console.log(this.features);
        this.sendGrades();
        alert("Your file was submitted");
        this.router.navigate(['../SystemFeatures']);
      }
    );
    
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

  sendGrades()
  {
    this.currentsrs.SRSid = this.features.SRSid;
    this.https.post<SRSDetails>('http://localhost:8080/project/savegrades2', this.currentsrs).subscribe(
      res => {
        this.currentsrs = res;
        console.log(this.currentsrs);
      }
    );
  }
}
