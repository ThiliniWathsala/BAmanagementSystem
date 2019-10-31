import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/PasswordReset/request/request.component';
import { ProfileViewComponent } from './components/own-profile-view/profile-view.component';
import { JbaLeaderboardComponent } from './components/leaderboard/jba-leaderboard/jba-leaderboard.component';
import { SbaLeaderboardComponent } from './components/leaderboard/sba-leaderboard/sba-leaderboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateProjectComponent } from './components/projectCreation/create-project/create-project.component';
import { AssignEmployeesComponent } from './components/projectCreation/assign-employees/assign-employees.component';
import { ChatComponent } from './components/chat/chat.component';
import { EmplistComponent } from './components/emplist/emplist.component';
import { SearchempComponent } from './components/searchemp/searchemp.component';
import { MessageComponent } from './components/message/message.component';
import { LeaveapproveComponent } from './components/leave/leaveapprove/leaveapprove.component';
import { LeavesubmitComponent } from './components/leave/leavesubmit/leavesubmit.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component'
import { LogoutComponent } from './components/logout/logout.component'
import { ProjectlistComponent } from './components/projectlist/projectlist.component'
import { GradealertComponent } from './components/gradealert/gradealert.component'
import { GradeComponent } from './components/grade/grade.component'
import { GradelistComponent } from './components/gradelist/gradelist.component'
import { OthersProfileViewComponent} from './components/others-profile-view/others-profile-view.component'
import { QuestionComponent } from './components/question/question.component'
import { QaComponent } from './components/qa/qa.component'
import { AnswerComponent } from './components/answer/answer.component'
import { AnswerlistComponent } from './components/answerlist/answerlist.component'
import { ProjectinfoComponent } from './components/projectinfo/projectinfo.component'
import { ResetblockedaccountComponent } from './components/resetblockedaccount/resetblockedaccount.component'
import { AdminchangepasswordComponent } from './components/adminchangepassword/adminchangepassword.component'
import { RestrictedComponent } from './components/restricted/restricted.component'
import { UseraccessComponent } from './components/useraccess/useraccess.component'
import { SRSComponent } from './components/srs/srs.component'
import { PmsrsComponent } from './components/pmsrs/pmsrs.component'
import { SbasrsComponent } from './components/sbasrs/sbasrs.component'
import { NotsubmittedComponent } from './components/notsubmitted/notsubmitted.component'
import { CustomerdetailsComponent } from './components/customerdetails/customerdetails.component'
import { DevsrsComponent } from './components/devsrs/devsrs.component'
import { OptionlistComponent } from './components/finalSRS/optionlist/optionlist.component'
import { IntroductionComponent } from './components/finalSRS/introduction/introduction.component'
import { OverallComponent } from './components/finalSRS/overall/overall.component'
import { NonfunctionalComponent } from './components/finalSRS/nonfunctional/nonfunctional.component'
import { SystemfeaturesComponent } from './components/finalSRS/systemfeatures/systemfeatures.component'
import { DisplayinterfaceComponent } from './components/finalSRS/displayinterface/displayinterface.component'
import { EditemployeeComponent } from './components/editemployee/editemployee.component'
import { OngoingprojectsComponent } from './components/ongoingprojects/ongoingprojects.component'
import { ReplyComponent } from './components/reply/reply.component'
import { ReplylistComponent } from './components/replylist/replylist.component'

const routes: Routes = [
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path: 'Login',
    component : LoginComponent
   },
  {
    path:'Request-password',
    component:RequestComponent
  },
  {
    path:'Profile',
    component:ProfileViewComponent
  },
  {
    path:'JBALeaderBoard',
    component:JbaLeaderboardComponent
  },
  {
    path:'SBALeaderBoard',
    component:SbaLeaderboardComponent
  },
  {
    path:'CreateProfile',
    component:CreateProfileComponent
  },
  {
    path:'CreateProject',
    component:CreateProjectComponent
  },
  {
    path:'AssignEmployees',
    component:AssignEmployeesComponent
  },
  {
    path:'Chat',
    component:ChatComponent
  },
  {
    path:'Employee',
    component:EmplistComponent
  },
  {
    path:'SearchedEmployee',
    component:SearchempComponent
  },
  {
    path:'Message',
    component:MessageComponent
  },
  {
    path:'LeaveApproval',
    component:LeaveapproveComponent
  },
  {
    path:'LeaveSubmit',
    component:LeavesubmitComponent
  },
  {
    path:'NewPassword',
    component:NewpasswordComponent
  },
  {
    path:'Logout',
    component:LogoutComponent
  },
  {
    path:'ProjectList',
    component:ProjectlistComponent
  },
  {
    path:'GradeList',
    component:GradelistComponent
  },
  {
    path:'Grade',
    component:GradeComponent
  },
  {
    path:'GradeAlert',
    component:GradealertComponent
  },
  {
    path:'OtherProfileView',
    component:OthersProfileViewComponent
  },
  {
    path:'NewQuestion',
    component:QuestionComponent
  },
  {
    path:'QuestionAnswer',
    component:QaComponent
  },
  {
    path:'NewAnswer',
    component:AnswerComponent
  },
  {
    path:'AnswerList',
    component:AnswerlistComponent
  },
  {
    path:'ProjectInfo',
    component:ProjectinfoComponent
  },
  {
    path:'ResetBlockedAccount',
    component:ResetblockedaccountComponent
  },
  {
    path:'AdminChangePassword',
    component:AdminchangepasswordComponent
  },
  {
    path:'AccessRestricted',
    component:RestrictedComponent
  },
  {
    path:'UserAccessOnly',
    component:UseraccessComponent
  },
  {
    path:'SRS',
    component:SRSComponent
  },
  {
    path:'PMSRS',
    component:PmsrsComponent
  },
  {
    path:'SBASRS',
    component:SbasrsComponent
  },
  {
    path:'SRSNotSubmitted',
    component:NotsubmittedComponent
  },
  {
    path:'EditCustomerDetails',
    component:CustomerdetailsComponent
  },
  {
    path:'DevSRS',
    component:DevsrsComponent
  },
  {
    path:'SRSOptions',
    component:OptionlistComponent
  },
  {
    path:'Overall',
    component:OverallComponent
  },
  {
    path:'DisplayInterface',
    component:DisplayinterfaceComponent
  },
  {
    path:'Introduction',
    component:IntroductionComponent
  },
  {
    path:'SystemFeatures',
    component:SystemfeaturesComponent
  },
  {
    path:'NonFunctional',
    component:NonfunctionalComponent
  },
  {
    path:'EditEmployee',
    component:EditemployeeComponent
  },
  {
    path:'OngoingProjects',
    component:OngoingprojectsComponent
  },
  {
    path:'Reply',
    component:ReplyComponent
  },
  {
    path:'ReplyList',
    component:ReplylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
