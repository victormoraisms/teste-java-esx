import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {IUser} from "../model/user.model";
import {map} from "rxjs/operators";
import {IChatroom} from "../model/chatroom.model";
import {MessageModel} from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(
    @Inject('BASE_API_URL') private apiUrl : string,
    private httpClient: HttpClient
  ) {

  }

  createRoom(name: string, id: number){

    let params = new HttpParams().set('name', name).set('id', id);

    return this.httpClient.post<any[]>(this.apiUrl + '/chatroom/create/' + name + "/" + id , null)
  }

  getRooms(){
    return this.httpClient.get<any[]>(this.apiUrl + '/chatroom/getRooms')
  }

  getMessages(id: number){
    return this.httpClient.get<MessageModel[]>(this.apiUrl + '/chatroom/getMessages/' + id);
  }

  sendMessage(newMessage : MessageModel){

    return this.httpClient.post<MessageModel>(this.apiUrl + '/chatroom/sendMessage', newMessage)

  }

  getCurrentsUsers(roomId: number){

    return this.httpClient.get<any[]>(this.apiUrl + '/chatroom/getCurrentUsers/' + roomId);
  }

}
