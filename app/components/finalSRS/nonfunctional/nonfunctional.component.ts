import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Nonfunctional } from 'src/app/modelClasses/nonfunctional';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';

@Component({
  selector: 'app-nonfunctional',
  templateUrl: './nonfunctional.component.html',
  styleUrls: ['./nonfunctional.component.css']
})
export class NonfunctionalComponent implements OnInit {

  nonfunctionaldetails: Nonfunctional={
    id:'',
    SRSid:'',
    datemodified:'',
    employeeid:'',
    performance:'',
    damages:'',
    safety:'',
    security:'',
    description:'',
    reference:'',
    attribute:'',
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

  admincheck:boolean = false;
  pm:boolean = false;
  sba:boolean = false;
  status:boolean =false;

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
        console.log(this.status);
        }
    }
    else
      this.router.navigate(['../Login']);
      
    }

  getDetails()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.nonfunctionaldetails.datemodified = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.nonfunctionaldetails.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Nonfunctional>('http://localhost:8080/project/getnonfunctional', this.nonfunctionaldetails).subscribe(
      res => {
        this.nonfunctionaldetails = res;
        console.log(this.nonfunctionaldetails);
        if(this.nonfunctionaldetails.employeeid != this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid'))))
          this.status = true;
      }
    );
  }
  
  submit()
  {
    this.https.post<Nonfunctional>('http://localhost:8080/project/submitnonfunctional', this.nonfunctionaldetails).subscribe(
      res => {
        this.nonfunctionaldetails = res;
        console.log(this.nonfunctionaldetails);
        this.sendGrades();
        alert("Your file was submitted");
        this.router.navigate(['../NonFunctional']);
      }
    );
    
  } 

  save()
  {
    this.https.post<Nonfunctional>('http://localhost:8080/project/savenonfunctional', this.nonfunctionaldetails).subscribe(
      res => {
        this.nonfunctionaldetails = res;
        console.log(this.nonfunctionaldetails);
        if(this.pm || this.sba)
          alert('Your comment was saved');
        else
        {
          this.sendGrades();
          alert("Your file was saved");
        }
        this.router.navigate(['../NonFunctional']);
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

  onFocusPerformance($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.performance = $value;
  }

  onEnterPerformance($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.performance = $value;
  }

  onFocusDamages($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.damages = $value;
  }

  onEnterDamages($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.damages = $value;
  }

  onFocusSafety($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.safety = $value;
  }

  onEnterSafety($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.safety = $value;
  }

  onFocusSecurity($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.security = $value;
  }

  onEnterSecurity($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.security = $value;
  }

  onFocusDescription($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.description = $value;
  }

  onEnterDescription($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.description = $value;
  }

  onFocusReference($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.reference = $value;
  }

  onEnterReference($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.reference = $value;
  }

  onFocusAttribute($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.nonfunctionaldetails.attribute = $value;
  }

  onEnterAttribute($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.nonfunctionaldetails.attribute = $value;
  }

  sendGrades()
  {
    this.currentsrs.user = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'projectid')));;
    console.log(this.currentsrs.user);
    this.https.post<SRSDetails>('http://localhost:8080/project/savegrades2', this.currentsrs).subscribe(
      res => {
        this.currentsrs = res;
        console.log(this.currentsrs);
      }
    );
  }

}