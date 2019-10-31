import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  image: string;

  name:string;

  type:string;

  constructor(private EncrDecr:EncrDecrService,
              private cookieService:CookieService) { }

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');

    this.image = '../../assets/'+this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypted))+'.jpg';

    encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empname');
    this.name = this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypted));
    encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');
    this.type = this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypted));
    if(this.type=='PM')
      this.type ='Project Manager';
    else if(this.type=='SBA')
      this.type = 'Senior BA';
    else if(this.type=='JBA')
      this.type = 'Junior BA';
    else if(this.type== 'Dev')
      this.type = 'Developer';
  }

}
