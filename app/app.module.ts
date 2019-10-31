import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RequestComponent } from './components/PasswordReset/request/request.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpServeService } from './services/http-serve.service';
import { DataSharingService } from './services/data-sharing.service';
import { ProfileViewComponent } from './components/own-profile-view/profile-view.component';
import { SbaLeaderboardComponent } from './components/leaderboard/sba-leaderboard/sba-leaderboard.component';
import { JbaLeaderboardComponent } from './components/leaderboard/jba-leaderboard/jba-leaderboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateProjectComponent } from './components/projectCreation/create-project/create-project.component';
import { AssignEmployeesComponent } from './components/projectCreation/assign-employees/assign-employees.component';
import { ChatComponent } from './components/chat/chat.component';
import { EmplistComponent } from './components/emplist/emplist.component';
import { SearchempComponent } from './components/searchemp/searchemp.component';
import { MessageComponent } from './components/message/message.component';
import { LeavesubmitComponent } from './components/leave/leavesubmit/leavesubmit.component';
import { LeaveapproveComponent } from './components/leave/leaveapprove/leaveapprove.component';
import { CookieService } from 'ngx-cookie-service';
import {EncrDecrService} from './services/encr-decr.service';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProjectlistComponent } from './components/projectlist/projectlist.component';
import { GradeComponent } from './components/grade/grade.component';
import { GradelistComponent } from './components/gradelist/gradelist.component';
import { GradealertComponent } from './components/gradealert/gradealert.component';
import { OthersProfileViewComponent } from './components/others-profile-view/others-profile-view.component';
import { QuestionComponent } from './components/question/question.component';
import { QaComponent } from './components/qa/qa.component';
import { AnswerComponent } from './components/answer/answer.component';
import { AnswerlistComponent } from './components/answerlist/answerlist.component';
import { ProjectinfoComponent } from './components/projectinfo/projectinfo.component';
import { ResetblockedaccountComponent } from './components/resetblockedaccount/resetblockedaccount.component';
import { AdminchangepasswordComponent } from './components/adminchangepassword/adminchangepassword.component';
import { RestrictedComponent } from './components/restricted/restricted.component';
import { UseraccessComponent } from './components/useraccess/useraccess.component';
import { SRSComponent } from './components/srs/srs.component';
import { PmsrsComponent } from './components/pmsrs/pmsrs.component';
import { SbasrsComponent } from './components/sbasrs/sbasrs.component';
import { NotsubmittedComponent } from './components/notsubmitted/notsubmitted.component';
import { CustomerdetailsComponent } from './components/customerdetails/customerdetails.component';
import { DevsrsComponent } from './components/devsrs/devsrs.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { OptionlistComponent } from './components/finalSRS/optionlist/optionlist.component';
import { IntroductionComponent } from './components/finalSRS/introduction/introduction.component';
import { OverallComponent } from './components/finalSRS/overall/overall.component';
import { DisplayinterfaceComponent } from './components/finalSRS/displayinterface/displayinterface.component';
import { SystemfeaturesComponent } from './components/finalSRS/systemfeatures/systemfeatures.component';
import { NonfunctionalComponent } from './components/finalSRS/nonfunctional/nonfunctional.component';
import { OngoingprojectsComponent } from './components/ongoingprojects/ongoingprojects.component';
import { EditemployeeComponent } from './components/editemployee/editemployee.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ReplylistComponent } from './components/replylist/replylist.component';

import { PasswordStrengthMeterModule } from '../../src/lib/password-strength-meter.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RequestComponent,
    HomeComponent,
    ProfileViewComponent,
    SbaLeaderboardComponent,
    JbaLeaderboardComponent,
    CreateProfileComponent,
    CreateProjectComponent,
    AssignEmployeesComponent,
    ChatComponent,
    EmplistComponent,
    SearchempComponent,
    MessageComponent,
    LeavesubmitComponent,
    LeaveapproveComponent,
    NewpasswordComponent,
    LogoutComponent,
    ProjectlistComponent,
    GradeComponent,
    GradelistComponent,
    GradealertComponent,
    OthersProfileViewComponent,
    QuestionComponent,
    QaComponent,
    AnswerComponent,
    AnswerlistComponent,
    ProjectinfoComponent,
    ResetblockedaccountComponent,
    AdminchangepasswordComponent,
    RestrictedComponent,
    UseraccessComponent,
    SRSComponent,
    PmsrsComponent,
    SbasrsComponent,
    NotsubmittedComponent,
    CustomerdetailsComponent,
    DevsrsComponent,
    MainviewComponent,
    OptionlistComponent,
    IntroductionComponent,
    OverallComponent,
    DisplayinterfaceComponent,
    SystemfeaturesComponent,
    NonfunctionalComponent,
    OngoingprojectsComponent,
    EditemployeeComponent,
    ReplyComponent,
    ReplylistComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PasswordStrengthMeterModule
  ],
  providers: [HttpServeService,DataSharingService,CookieService,EncrDecrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
