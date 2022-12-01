import {User} from "./user"
import {Channel} from "./channel"

export class Group {

    groupname:string
    usernames:string[]
    channels:Channel[]

    constructor(groupname:string = "",channels:Channel[] = [], usernames:string[] = []){

        this.groupname = groupname
        this.usernames = usernames
        this.channels = channels
        let allinstances = []
        // allinstances.push(users)

    }

    // getChannels(){
    //     return (this.channels)
    // }

    // removeUsers(){
    //     for (let i = 0; i<this.users.length; i++){
    //         this.users.pop()
    //     }
    // }

    
}
