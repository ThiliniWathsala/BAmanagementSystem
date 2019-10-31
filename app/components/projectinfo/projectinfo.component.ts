import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/modelClasses/project';

@Component({
  selector: 'app-projectinfo',
  templateUrl: './projectinfo.component.html',
  styleUrls: ['./projectinfo.component.css']
})
export class ProjectinfoComponent implements OnInit {

  constructor(private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  currentproject: Project = {
    projectid: '',
    name: '',
    pm: '',
    lba: '',
    customerid: '',
    jba1: '',
    jba2: '',
    dev1: '',
    dev2: '',
    dev3: '',
    dev4: '',
    dev5: '',
    description: ''
  };

  ngOnInit() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'emptype');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) === "admin")
        this.router.navigate(['../UserAccessOnly']);
      else
        this.getDetails();
    }
    else
      this.router.navigate(['../Login']);
  }

  getDetails() {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'projectid');
    this.currentproject.projectid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Project>('http://localhost:8080/project/projectinfo', this.currentproject).subscribe(
      res => {
        this.currentproject = res;
        console.log(this.currentproject);
      }
    );
  }

}
