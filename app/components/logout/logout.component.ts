import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService:CookieService,
              private router:Router,
              private EncrDecr:EncrDecrService) { }

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
          this.cookieService.deleteAll();
      }
      else
        this.router.navigate(['../Login']);
  }

}
