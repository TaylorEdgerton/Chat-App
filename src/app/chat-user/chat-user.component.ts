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


//set url for server http POST data retrieval
const BACKEND_URL = 'http://localhost:3000';

//Interface for initialising group and channel objects

interface Channels{
  channelNum:string,
  usernames : string[]
  messageHistory: string[]
}

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit, AfterViewChecked {
  


  // ------------------ Variables ------------------


//message variables
  messagecontent : any = {
    message:"",
    profilePic : "",
    username : "",
    date : "",
    fromId : "",
    group: "",
    channel:null
  }
  messages:any[] = [];

  //Socket IO variable
  ioConnection:any;

  //profile pic path variable
  BACKEND_IMG_URL:string = 'http://localhost:3000/images/'

  //User Variables
  //initialise current user from session storage
  currentUser:any = {
    id:sessionStorage.getItem("id"),
    username:sessionStorage.getItem("username"),
    email:sessionStorage.getItem("email"),
    profilePic:sessionStorage.getItem("profilePic"),
    role:sessionStorage.getItem("role")
  }
  allUsers:any[] = []
  deleteIndex:number = 0
  selectedFile:any = null
  imagePath:string = this.currentUser.profilePic
  autgGroupName:any = []
  autgUserName:any = []


  //Channel and group variables
  channels:Channels = {channelNum: "1", usernames: [this.currentUser.username], messageHistory: []}
  groups:Group[] = [{groupname: "", channels: [], usernames: []}]
  allGroups:Group[] = [{groupname: "", channels: [], usernames: []}]

  selectedGroupShowChannels:any | undefined = undefined
  selectedChannelChatUsers: any | undefined = undefined


 
  constructor(private router:Router, private http:HttpClient, private socketService:SocketService, private mongodb:MongodbService) {}

  // ------------------ functions for chat messages to auto scroll to new message at bottom ------------------

  @ViewChild('scrollMe') private myScrollContainer:any;

  // ------------------ Chat message display to scroll to the new message at the bottom when new message recieved ------------------
  scrollToBottom(){
    try{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(err){}
  }
  ngAfterViewChecked():void{
    this.scrollToBottom()
  }
  
  // ------------------ Group Functions ------------------
  // ------------------ Return groups the current user is in ------------------
  getGroups(){
    this.http.post<any>(BACKEND_URL + "/chatUserChannels", this.currentUser, httpOptions).subscribe((data:any)=>{
      this.groups = data
      console.log("getGroups")
      console.log(this.groups)
    
    })
  }

// ------------------ Show channels within selected group in dropdown menu ------------------
  showGroup(i:any){
    //reset variables
    this.selectedChannelChatUsers = undefined
    this.selectedGroupShowChannels = undefined
    let channels = []
    //convert index event to int
    let index:number = parseInt(i.target.value)
    //loop selected group object and make sure username within the channel username array
    for(let i = 0; i < this.groups[index].channels.length; i++){
        if (this.groups[index].channels[i].usernames.includes(this.currentUser.username)){
          channels.push(this.groups[index].channels[i])
        }
    }
    //add only channels the user is joined
    this.selectedGroupShowChannels = this.groups[index]
    this.selectedGroupShowChannels.channels = channels
  }

  //------------------ function to show users within selected channel ------------------
  showChannel(i:any){
    this.selectedChannelChatUsers = undefined
    //convert index event to int
    let index:number = parseInt(i.target.value)
    //isolate users array from specific channel
    this.selectedChannelChatUsers = this.selectedGroupShowChannels.channels[index]
    //keep track of group name
    this.selectedChannelChatUsers.groupname = this.selectedGroupShowChannels.groupname
    //join socket io room, the id being groupname and channelnum
    this.socketService.join(this.selectedGroupShowChannels.groupname + this.selectedChannelChatUsers.channelNum)
    //get message history from API
    this.getMessageHistory(this.selectedChannelChatUsers)

    console.log("selectedChannelChatUsers")
    console.log(this.selectedChannelChatUsers)
  }

//------------------ Current User Logout ------------------
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("")
  }

  // ------------------ API requests to return when page loads ------------------
  ngOnInit(): void {
    this.getGroups()
    this.initIoConnection()
  }


  // ------------------ Socket io services functions ------------------
  initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    .subscribe((message:any) =>{
      this.messages.push(message)
      //function to scroll chat feed to the bottom to auto view new messages
      this.scrollToBottom()
    });
  }
  
  // ------------------ Send and sort chat message function ------------------
  chat(){

    //set a date and time for the message
    if (this.messagecontent.message){
      var newdate = new Date()
      var day = newdate.getDate().toString()
      var month = newdate.getMonth().toString()
      var year = newdate.getFullYear().toString()
      var hours = newdate.getHours().toString()
      var minutes = newdate.getMinutes().toString()
      if (minutes.length == 1){
        minutes = "0" + minutes
      }
      if (hours.length == 1){
        hours = "0" + hours
      }

      //set message info
      this.messagecontent.fromId = this.currentUser.id
      this.messagecontent.profilePic = this.currentUser.profilePic
      this.messagecontent.username = this.currentUser.username

      //format set date and time for message display 
      this.messagecontent.date = (day + "/" + month + "/" + year + " " + hours + ":" + minutes + " - ");
      this.messagecontent.group = this.selectedChannelChatUsers.groupname;
      this.messagecontent.channel = this.selectedChannelChatUsers.channelNum;

      //send message to database
      this.updateMessageHistory(this.messagecontent)
      this.socketService.send(this.messagecontent);
      console.log("Messages")
      console.log(this.messages)
      console.log(this.messagecontent.message)
      this.messagecontent.message="";

      //return message from database
      this.getMessageHistory(this.selectedChannelChatUsers)
      console.log("sentmessageGetMEssageHistory")
      console.log(this.selectedChannelChatUsers)
    } else{
      console.log("no message")
    }
  }

  //------------------ API update message history ------------------
  updateMessageHistory(message:any){
    this.http.post<any>(BACKEND_URL + "/updateMessageHistory", message).subscribe((data:any)=>{
      alert(data)
    })
  }

  // ------------------API request function for getting messages ------------------
  getMessageHistory(userGroupChannel:any){
    this.http.post<any>(BACKEND_URL + "/getMessageHistory", userGroupChannel).subscribe((data:any)=>{
      console.log("datachannelsmessagehistory")
      console.log(data[0])
      this.selectedChannelChatUsers.messageHistory = data[0].channels[0].messageHistory
      
    })
  }

// ------------------ API Profile image Upload ------------------
imageUpload(file:any){
  return this.http.post<any>(BACKEND_URL + "/imageUpload", file)
    }

// ------------------ Add to variable selected file to be uploaded ------------------
fileSelected(event:any){
  this.selectedFile = event.target.files[0]
}


//------------------ Send new profile pic to be saved server side ------------------
fileUploaded(){
  const formData = new FormData()
  formData.append('image', this.selectedFile, this.selectedFile.name)
  this.http.post<any>(BACKEND_URL + "/imageUpload", formData).subscribe(res=>{
    this.imagePath = res.data.filename;
    //profile pic stored as file path
    this.currentUser.profilePic = this.imagePath
    console.log(this.currentUser.profilePic)
    this.http.post<any>(BACKEND_URL + '/updateProfilePic', this.currentUser, httpOptions).subscribe((response:any)=>{
      if (response.Updated == true){
        alert("Profile Pic Updated")
      }
      else{
        alert("Error")
      }
    })
    })
  }
}

