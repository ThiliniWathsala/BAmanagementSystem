import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServeService {

private baseUrl = 'http://localhost:8080'; //this variable is declared to use as the base IP for back-end

  constructor(private http:HttpClient) { }

//write methods here
signup(data){
  return this.http.post(`${this.baseUrl}/signup`, data) //use back quotes `` when using variables with ${}
}
login(data){
  return this.http.post(`${this.baseUrl}/login`, data)
}

}
