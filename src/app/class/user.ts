
import {Group} from "./group"



export class User{
      constructor(
        public id:string,
        public username:string,
        // public pwd:string, 
        public email:string,
        public role:string, 
        public profilePic:string,
        public groups:[])
        {}

       
}
