import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private EncrDecr: EncrDecrService,
              private cookieService:CookieService) { }

  status:boolean = false;

  pm:boolean = false;
  sba:boolean = false;
  jba:boolean = false;
  admin:boolean = false;

  type:string;

  ngOnInit() {

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
    this.type = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));

    if(this.type == 'PM')
      this.pm = true;
    else if(this.type == 'JBA')
      this.jba = true;
    else if(this.type == 'SBA')
      this.sba = true;
    else if(this.type == 'admin')
      this.admin = true;

  }

}
