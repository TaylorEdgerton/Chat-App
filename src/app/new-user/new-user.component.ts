import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {User} from '../class/user'
const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
import {observable} from 'rxjs';
import {EmailValidator, NgForm} from '@angular/forms';

import {Router} from '@angular/router';
//set url for server http POST data retrieval
const BACKEND_URL = 'http://localhost:3000';

//interface for recieving userProfile POST information
export interface Userobj {
  username: string,
  pwd: string,
  email: string,
  profilePic: string,
  role: string
}

// interface for http POST username and password check
export interface Upwd {
  username:string,
  pwd:string
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userobj: Userobj = {username:"", pwd:"", email:"", profilePic:"default.jpg", role:""}
  upwd:Upwd = {username:"", pwd:""}
  constructor(private router:Router, private http:HttpClient) { 
    
  }
  user:any
  // username = ""
  // pwd = ""
  // email = ""
  // profilePic = ""
  

  createUser(){
    //send http POST request to localhost:3000 and retrieve {"validuser":true} object
    this.http.post(BACKEND_URL + '/newUser', this.userobj)
    .subscribe((created:any)=>{
      console.log(created.created)
      if (created.created == true) {
        this.router.navigateByUrl("chatuser")
      }

      //check if returned validUser == true
      // if (validUser.user == false) {
      //   // console.log("valid")
      //   // if true continue with retrieval of profile information from server
      //   this.http.post(BACKEND_URL + '/newUserProfile', 
      //   this.userobj,
      //    httpOptions).subscribe((data:any) =>{
      //     if (data.created == true){
      //     this.router.navigateByUrl("chatuser")
      //     }
 
        
        //once recieving valid user profile information, set to session storage
       
        // console.log("User" + userData[0].username + "Created")
        // sessionStorage.setItem('username', userData[0].username);
        // sessionStorage.setItem("email", userData[0].email);
        // sessionStorage.setItem("role", userData[0].role)
        // console.log(userData.username)
        
      
        // console.log(this.test1)
      
        else{
          alert("This username is allready taken")
        }
      })


  }
    // {
    //   this.user = new User (this.username, this.pwd, this.email, this.profilePic)
    //   console.log(this.user)
    //   sessionStorage.setItem("username", this.user.username)
    //   sessionStorage.setItem("email", this.user.email)
    // }

  ngOnInit(): void {
  }

}
