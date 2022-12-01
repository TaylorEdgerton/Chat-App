import { Component, OnChanges, AfterViewChecked, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import { MongodbService } from '../services/mongodb.service';
import { FormsModule } from '@angular/forms';
import {Message} from "../class/message"
import {User} from "../class/user"
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
//Set http header variable
const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
import {observable} from 'rxjs';
import {EmailValidator, NgForm} from '@angular/forms';

import {Router} from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {Group} from '../class/group'
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import{ChatUserComponent} from '../chat-user/chat-user.component'

const BACKEND_URL = 'http://localhost:3000';

interface Channels{
  channelNum:string,
  usernames : string[]
  messageHistory: string[]
}

chatcomponent:ChatUserComponent

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  allGroups:Group[] = [{groupname: "", channels: [], usernames: []}]
  allUsers:any[] = []
  groups:Group[] = [{groupname: "", channels: [], usernames: []}]
  newGroupName:string = ""

  currentUser:any = {
    id:sessionStorage.getItem("id"),
    username:sessionStorage.getItem("username"),
    email:sessionStorage.getItem("email"),
    profilePic:sessionStorage.getItem("profilePic"),
    role:sessionStorage.getItem("role")
  }


  constructor(private router:Router, private http:HttpClient, private socketService:SocketService, private mongodb:MongodbService) {}

   // ------------------ Admin to create new group ------------------
   createGroup(groupName:string){
    let x:any = this.mongodb.createGroup(groupName)
    this.allGroups.push(x)
  }

    // ------------------ Admin Delete Group Function ------------------

    deleteGroup(groupname:string){
      let groupName = {groupName:groupname}
      console.log(groupName)
      this.http.post<any>(BACKEND_URL + "/deleteGroup", groupName).subscribe((data:any)=>{
        console.log(data)
        this.allGroups = data
      })
    }

    // ------------------ Admin Return all groups in database ------------------
  getAllGroups(){
    this.http.post<any>(BACKEND_URL + "/getAllGroups", this.currentUser).subscribe((data:any)=>{
      this.allGroups = data
      console.log(data)
      for(let i = 0; i < this.allGroups.length; i++){
        console.log(this.allGroups[i])
        for(let j = 0; j < this.allGroups[i].channels.length; j++){
          console.log(this.allGroups[i].channels[j])
        }
      }
    })
    
  }


  
  // ------------------ Admin add user to group ------------------

  addUserToGroup(groupname:string, username:string){
    let findGroupIndex = this.groups.findIndex((x) => x.groupname == groupname)
    let findUser = this.groups.findIndex((x) =>
    this.groups[findGroupIndex].usernames.push(username))
    // this.http.post<any>(BACKEND_URL + "/updateGroup", this.groups, httpOptions).subscribe((data)=>{
    //   this.groups = data
    // })
    console.log(this.groups)
  }

  // ------------------ Admin add selected user to channel ------------------
  addUserToChannel(){
    
  }
  
  // ------------------ Admin return all users in database ------------------
  getAllUsers(){
    this.http.get<any>(BACKEND_URL + "/getAllUsers").subscribe((data)=>{
      this.allUsers = data
    })
  }

    // ------------------ Admin delete selected user ------------------
    deleteUser(i:number){
      // let deleteIndex=i
      let deleteIndexedUser = this.allUsers[i]
      this.http.post(BACKEND_URL + '/deleteUser', deleteIndexedUser)
      .subscribe((data:any)=>{
        console.log(data)
        this.allUsers = data
      })
    }


  ngOnInit(): void {
    this.getAllUsers()
    this.getAllGroups()
  }

}
