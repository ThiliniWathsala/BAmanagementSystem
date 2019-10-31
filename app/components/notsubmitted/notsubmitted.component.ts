import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { SRSDetails } from 'src/app/modelClasses/srsdetails';

@Component({
  selector: 'app-notsubmitted',
  templateUrl: './notsubmitted.component.html',
  styleUrls: ['./notsubmitted.component.css']
})
export class NotsubmittedComponent implements OnInit {

  constructor(private https: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private EncrDecr: EncrDecrService) { }

              

                admincheck:boolean = false;

  ngOnInit() {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
  if (this.cookieService.check(encrypted1))
    this.admincheck = true;

  var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
  encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
  var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
  var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');

  if (this.cookieService.check(encrypted)) {
    if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
      this.router.navigate(['../NewPassword']);
    else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
      this.router.navigate(['../GradeAlert']);
    else
      this.startMethod();
  }
  else
    this.router.navigate(['../Login']);
}

  startMethod()
  {
    var status = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'status')));
    var type = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'emptype')));
    var option = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(this.EncrDecr.set('123456$#@$^@1ERF', 'option')));
    console.log(option);
    
    if(status==='submitted')
    {
      if(type==='JBA')
        this.router.navigate(['../'+option]);
      else if(type==='SBA')
        this.router.navigate(['../'+option]);
    }
    else if(status==='created')
    {
      if(type==='JBA')
      this.router.navigate(['../'+option]);
    }
    else if(status==='approved')
    {
      if(type==='JBA')
        this.router.navigate(['../'+option]);
      else if(type==='SBA')
        this.router.navigate(['../'+option]);
      else if(type==='PM')
        this.router.navigate(['../'+option]);
    }
    else if(status==='rejected')
    {
      if(type==='JBA')
      this.router.navigate(['../'+option]);
    }
    else if(status==='acknowledged')
    {
      if(type==='JBA')
        this.router.navigate(['../'+option]);
      else if(type==='SBA')
        this.router.navigate(['../'+option]);
      else if(type==='PM')
        this.router.navigate(['../'+option]);
      else if(type==='Dev')
        this.router.navigate(['../'+option]);
    }
      
    
  }

}
