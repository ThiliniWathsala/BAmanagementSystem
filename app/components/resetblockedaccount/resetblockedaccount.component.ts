import { Component, OnInit } from '@angular/core';
import { EmpType } from 'src/app/modelClasses/emp-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { BlockingProxy } from 'blocking-proxy';

@Component({
  selector: 'app-resetblockedaccount',
  templateUrl: './resetblockedaccount.component.html',
  styleUrls: ['./resetblockedaccount.component.css']
})
export class ResetblockedaccountComponent implements OnInit {

  details:EmpType ={
    employeeid:'',
    fname:'',
    lname:'',
    password:'',
    type:'',
    email:'',
    username:'',
    contact1:'',
    contact2:'',
    addressno:'',
    street:'',
    city:'',
    status:'',
    about:'',
    image:'',
    passstatus:'',
    gradestatus:''
  }

  constructor(private https:HttpClient,
    private router:Router,
    private cookieService:CookieService,
    private EncrDecr: EncrDecrService ) { }

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
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3)) != "admin")
        this.router.navigate(['../AccessRestricted']);
    }
    else
      this.router.navigate(['../Login']);
  }

  inSubmit():void{
    // alert(this.model.email);
     
     this.https.post<EmpType>('http://localhost:8080/employee/adminreset',this.details).subscribe(
       res => {
           this.details = res;
           console.log(this.details);
           this.checkUser(this.details);
     }
   
     //  res=>{this.router.navigate(['/home'])} 
     );
   }

   public checkUser(user1:EmpType){
    if(user1.email!=null){
      alert("Account Reset was successful. New Password is sent to the User Email");
      this.ngOnInit();
    }
    else{
      alert("Email not registered");
    }
   }

   blockNow($value)
    {
      this.details.email = $value;
      this.https.post<EmpType>('http://localhost:8080/employee/blockaccount',this.details).subscribe(
       res => {
           this.details = res;
           console.log(this.details);
      if(this.details.email!=null){
        alert("Account Blocked");
        this.ngOnInit();
      }
      else{
        alert("Email not registered");
      }     
    });
  }

  change($value)
    {
      var empemail = this.EncrDecr.set('123456$#@$^@1ERF', 'empemail');
      var empemaild = this.EncrDecr.set('123456$#@$^@1ERF', $value);  
      this.cookieService.set(empemail,empemaild);
      this.router.navigate(['../EditEmployee']);
    }
      

}
