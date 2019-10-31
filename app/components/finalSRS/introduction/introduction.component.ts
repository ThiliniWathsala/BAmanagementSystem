import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Introduction } from 'src/app/modelClasses/introduction';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  introductiondetails: Introduction = {
    id:'',
    SRSid:'',
    datemodified:'',
    employeeid:'',
    purpose:'',
    specifications:'',
    suggestions:'',
    audience:'',
    benefits:'',
    goal:'',
    objectives:'',
    reference:'',
    SBAcomment:'',
    PMcomment:''
  }

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
        }
    }
    else
      this.router.navigate(['../Login']);
      
    }

  getDetails()
  {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.introductiondetails.datemodified = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    console.log(this.introductiondetails.SRSid);
    this.introductiondetails.employeeid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.https.post<Introduction>('http://localhost:8080/project/getintroduction', this.introductiondetails).subscribe(
      res => {
        this.introductiondetails = res;
        console.log(this.introductiondetails);
        console.log(this.status);

        if(this.introductiondetails.employeeid != this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'empid'))))
          this.status = true;
        console.log(this.status);

      }
    );
  }

  save()
  {
    console.log(this.introductiondetails.SBAcomment);
    this.https.post<Introduction>('http://localhost:8080/project/saveintroduction', this.introductiondetails).subscribe(
      res => {
        this.introductiondetails = res;
        console.log(this.introductiondetails);
        if(this.pm || this.sba)
          alert('Your comment was saved');
        else
        {
          this.sendGrades();
          alert("Your file was saved");
        }
    this.router.navigate(['../Introduction']);
      }
    );
    
  }
  
  submit()
  {
    this.https.post<Introduction>('http://localhost:8080/project/submitintroduction', this.introductiondetails).subscribe(
      res => {
        this.introductiondetails = res;
        console.log(this.introductiondetails);
        this.sendGrades();
        alert("Your file was submitted");
        this.router.navigate(['../Introduction']);
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

  onFocusPurpose($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.purpose = $value;
  }

  onEnterPurpose($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.purpose = $value;
  }

  onFocusSpecifications($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.specifications = $value;
  }

  onEnterSpecifications($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.specifications = $value;
  }

  onFocusSuggestions($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.suggestions = $value;
  }

  onEnterSuggestions($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.suggestions = $value;
  }

  onFocusAudience($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.audience = $value;
  }

  onEnterAudience($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.audience = $value;
  }

  onFocusBenefits($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.benefits = $value;
  }

  onEnterBenefits($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.benefits = $value;
  }

  onFocusGoal($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.goal = $value;
  }

  onEnterGoal($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.goal = $value;
  }

  onFocusObjectives($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.objectives = $value;
  }

  onEnterObjectives($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.objectives = $value;
  }

  onFocusReference($value)
  {
      if($value==='')
      {
        $value +='• ';
        this.savedcount = 1;
      }
        this.introductiondetails.reference = $value;
  }

  onEnterReference($value)
  {
    $value +='• ';
    console.log($value);
    this.savedcount = $value.length;
    this.introductiondetails.reference = $value;
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
