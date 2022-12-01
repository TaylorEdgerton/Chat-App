import {Group} from "./group"
import {User} from "./user"



export class Channel {
    channelNum:string
    usernames:string[]
    messageHistory:string[]
    constructor(channelNum:string="", usernames:string[] = [], messageHistory:string[]){
        this.channelNum = channelNum
        this.usernames = usernames
        this.messageHistory = messageHistory
    }

}
