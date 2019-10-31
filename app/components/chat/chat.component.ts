import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ChatMessage } from 'src/app/modelClasses/chat-message';
import { CookieService } from 'ngx-cookie-service';
import {EncrDecrService} from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chattinglist: ChatMessage[]=[];

  getlist: ChatMessage={
    empid:'',
    empidowner:'',
    chatid:'',
    empname:'',
    ownername:''
  };

  admincheck = false;

  constructor(private dataShare:DataSharingService,
              private router:Router,
              private https:HttpClient,
              private cookieService:CookieService,
              private EncrDecr: EncrDecrService) { }

  ngOnInit() {

    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if(this.cookieService.check(encrypted0))
        this.admincheck = true;

        var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
        var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
        var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');
    
        if (this.cookieService.check(encrypted)) {
          if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
            this.router.navigate(['../NewPassword']);
          else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
            this.router.navigate(['../UserAccessOnly']);
          else
            this.getChatList();
        }
        else
          this.router.navigate(['../Login']);
    // if(this.cookieService.get('empid')==='in1151')
    //   {
    //     this.router.navigate(['/home']);
    //   }
    
    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'in1151');
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
   
    // console.log('Encrypted :' + encrypted);
    // console.log('Encrypted :' + decrypted);    
  }

  public getChatList(){
    console.log("Starting Chattinglist");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.getlist.empidowner = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted));
    console.log(this.getlist);
  this.https.post<ChatMessage[]>('http://localhost:8080/employee/chatlist',this.getlist).subscribe(
    response => {
      this.chattinglist = response;
      console.log(this.chattinglist);
  }
  );
  }

  onSubmit($value):void{
    console.log($value.chatid);
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', $value.chatid);
    this.cookieService.set(encrypted1,encrypted2);
    encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatempname');
    encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', $value.empname);
    this.cookieService.set(encrypted1,encrypted2);
    this.router.navigate(['../Message']); 
   }
}
