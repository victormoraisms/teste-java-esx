import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {IUser} from "../model/user.model";
import {map} from "rxjs/operators";

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

    // const httpOptions = {
    //   params: new HttpParams()
    //     .set('name', name)
    //     .set('id', id)
    // }
    let params = new HttpParams().set('name', name).set('id', id);

    return this.httpClient.post<any[]>(this.apiUrl + '/chatroom/create/' + name + "/" + id , null)
  }

}
