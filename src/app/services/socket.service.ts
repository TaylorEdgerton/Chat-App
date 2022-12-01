import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
//problem below
import {io} from 'socket.io-client';
import {Message} from "../class/message"



const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any
  constructor() { }
  
  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }
  send(message:any){
    this.socket.emit('message',message, message.group+message.channel);
  } 
  join(id:any){
    this.socket.emit('join room', id)
  }

  getMessage(){

      return new Observable(observer=>{
  
        // this.socket.on('message', (data:Message) => observer.next(data));
        this.socket.on('message', (data:any) => {observer.next(data)});

  
    });
  
    // return observable;
  
    }
}
