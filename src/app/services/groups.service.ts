// import { Component, OnChanges, AfterViewChecked, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
// import {SocketService} from '../services/socket.service';
// import { MongodbService } from '../services/mongodb.service';
// import { FormsModule } from '@angular/forms';
// import {Message} from "../class/message"
// import {User} from "../class/user"
// import { BrowserModule } from '@angular/platform-browser';
// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http'
// //Set http header variable
// const httpOptions = {
//   headers: new HttpHeaders({'Content-type': 'application/json'})
// };
// import {Observable, observable} from 'rxjs';
// import {EmailValidator, NgForm} from '@angular/forms';

// import {Router} from '@angular/router';
// import { ValueConverter } from '@angular/compiler/src/render3/view/template';
// import {Group} from '../class/group'



// //set url for server http POST data retrieval
// const BACKEND_URL = 'http://localhost:3000';

// @Injectable({
//   providedIn: 'root'
// })
// export class GroupsService {
//     users = []
//   groupName:string = ""
//   groups=[{group:{users:[]}}]

//   constructor(private router:Router, private http:HttpClient, private socketService:SocketService, private mongodb:MongodbService) {}

  
// //   createGroup(groupName:string){
// //     this.groups."groupName"

// //   }

// getGroups(user:any):Observable<any>{

//     return this.http.post<any>(BACKEND_URL + "/chatUserChannels", user, httpOptions)
//   }
// }
