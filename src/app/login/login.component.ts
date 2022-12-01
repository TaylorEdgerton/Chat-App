import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Component, ViewChild, OnInit } from '@angular/core';
//Set http header variable
const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
import {observable} from 'rxjs';
import {EmailValidator, NgForm} from '@angular/forms';

import {Router} from '@angular/router';
import { TestBed } from '@angular/core/testing';

//set url for server http POST data retrieval
const BACKEND_URL = 'http://localhost:3000';

//interface for recieving userProfile POST information
export interface Userobj {
  id:string,
  username: string,
  email: string,
  profilePic: string,
  role: string
  groups:string[]
}

// interface for http POST username and password check
export interface Upwd {
  username:string,
  pwd:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  userobj: Userobj = {id:"", username:"", email:"", profilePic:"", role:"", groups:[]}
  constructor(private router:Router, private http:HttpClient) {}

  upwd:Upwd = {username:"", pwd:""}
  ngOnInit() {}
  
  public login(){

    //send http POST request to localhost:3000 and retrieve {"validuser":true} object
    this.http.post(BACKEND_URL + '/loginValidate', this.upwd, httpOptions)
    .subscribe((validUser:any)=>{
      //check if returned validUser == true
      if (validUser.user == true) {
        // console.log("valid")
        // if true continue with retrieval of profile information from server
        this.http.post(BACKEND_URL + '/validUser', this.upwd, httpOptions)
        .subscribe((userData: any) => {
        //once recieving valid user profile information, set to session storage
        sessionStorage.setItem('id', userData[0]._id)
        sessionStorage.setItem('username', userData[0].username);
        sessionStorage.setItem("email", userData[0].email);
        sessionStorage.setItem("profilePic", userData[0].profilePic)
        sessionStorage.setItem("role", userData[0].role)
        // console.log(userData.username)
        this.router.navigateByUrl('chatuser')
      })
        // console.log(this.test1)
      }
        else{
          alert("Invalid Username or Password")
        }
    });

  }
}
