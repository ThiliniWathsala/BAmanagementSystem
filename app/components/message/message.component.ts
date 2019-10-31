import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'src/app/modelClasses/message';
import { ChatMessage } from 'src/app/modelClasses/chat-message';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild("box",{static:false}) MyProp: ElementRef;

  messagelist: Message[] = [];

  greetings: Message[] = [];
  disabled = true;
  name: string;
  private stompClient = null;

  getmsglist: ChatMessage = {
    empid: '',
    empidowner: '',
    chatid: '',
    empname: '',
    ownername: ''
  };

  newmessage: Message = {
    messageid: '',
    date: '',
    time: '',
    sender: '',
    content: '',
    chatid: '',
    status: null
  }

  admincheck = false;
  isDisabled = true;

  imageowner:string;
  image:string;

  constructor(private dataShare: DataSharingService,
    private router: Router,
    private https: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    var encrypted0 = this.EncrDecr.set('123456$#@$^@1ERF', 'adminaccess');
    if (this.cookieService.check(encrypted0))
      this.admincheck = true;

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'passstatus');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'gradestatus');

    if (this.cookieService.check(encrypted)) {
      if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)) === "new")
        this.router.navigate(['../NewPassword']);
      else if (this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2)) === "required")
        this.router.navigate(['../GradeAlert']);
      else{
        this.getMessages();
        this.connect();
      }
    }
    else
      this.router.navigate(['../Login']);
  
  }

  public getMessages() {
    this.newmessage.content = null;
    console.log("Starting Messagelist");

    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatempname');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.getmsglist.chatid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    console.log(this.getmsglist);
    this.https.post<Message[]>('http://localhost:8080/employee/messagelistfromchat', this.getmsglist).subscribe(
      response => {
        this.greetings = response;
        console.log(this.greetings);
        this.greetings.forEach(element => {
          if (element.sender === this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3))) {
            element.status = true;
          }
          else {
            element.status = false;
            this.image = '../../assets/'+element.sender+'.jpg';
            element.sender = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
          }
        });
        console.log(this.greetings);
        this.imageowner = '../../assets/'+this.EncrDecr.get('123456$#@$^@1ERF',this.cookieService.get(encrypted3))+'.jpg';
        this.newmessage.content = "";
        
        
      }
    );
  }

  check(message) {
    this.MyProp.nativeElement.scrollIntoView(false);
    if (message.status) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
  }

  onSubmit(): void {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.newmessage.sender = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.newmessage.chatid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.https.post<Message>('http://localhost:8080/employee/newmessage', this.newmessage).subscribe(
      res => {
        this.newmessage = res;
        console.log(this.newmessage);
        console.log("done");
        this.newmessage.content = "";
        this.getMessages();
        // this.MyProp.nativeElement.scrollIntoView(false);
        
      }
    );
    
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      // _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/hi', function (hello) {
        console.log(JSON.parse(hello.body));
        
        _this.showGreeting(JSON.parse(hello.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    // this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    this.newmessage.sender = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    this.newmessage.chatid = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1));
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage.content = "";
    // this.MyProp.nativeElement.scrollIntoView(false);

  }

  showGreeting(message) {
    var encrypted1 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatid');
    var encrypted2 = this.EncrDecr.set('123456$#@$^@1ERF', 'chatempname');
    var encrypted3 = this.EncrDecr.set('123456$#@$^@1ERF', 'empid');
    if (message.sender === this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted3))) {
      message.status = true;
    }
    else {
      message.status = false;
      message.sender = this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted2));
    }

    if(message.chatid === this.EncrDecr.get('123456$#@$^@1ERF', this.cookieService.get(encrypted1)))
      this.greetings.push(message);

      // this.MyProp.nativeElement.scrollIntoView(false);
  }




}


