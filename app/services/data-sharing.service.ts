import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

private messageSource1 = new BehaviorSubject<any> ("default");
private messageSource2 = new BehaviorSubject<any> ("default");
private messageSource3 = new BehaviorSubject<any> ("default");

employeeDetails = this.messageSource1.asObservable();
projectId = this.messageSource2.asObservable();
getEmployee = this.messageSource3.asObservable();

  constructor() { }

  setEmployeeDetails(message:any){
    this.messageSource1.next(message); 
  }
  setprojectId(message:any){
    this.messageSource2.next(message); 
  }
  getEmp(message:any){
      this.messageSource3.next(message); 
    }
    
}
