import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
//Set http header variable
const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
import {observable} from 'rxjs';
import {EmailValidator, NgForm} from '@angular/forms';
import { Group } from'../class/group'
import {Channel} from '../class/channel'
const BACKEND_URL = 'http://localhost:3000';



@Injectable({
  providedIn: 'root'
})

export class MongodbService {
  constructor(private http:HttpClient) { }

  createGroup(groupName:string){
    let newGroup:Group = {groupname: groupName, channels: [], usernames: []}
    this.http.post<any>(BACKEND_URL + "/addGroup", newGroup, httpOptions).subscribe((data:any)=>{
      if (data.created == true){
        alert("Group" + groupName + "Created")
        return(data)
      }
    })
  }
}
