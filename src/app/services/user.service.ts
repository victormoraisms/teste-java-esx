import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from "../model/user.model";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  public currentUserNameBehavior: BehaviorSubject<String> = new BehaviorSubject<String>("");
  public currentUserIdBehavior: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserName = this.currentUserNameBehavior.asObservable();
  currentUserId = this.currentUserIdBehavior.asObservable();

  constructor(
    @Inject('BASE_API_URL') private apiUrl : string,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<IUser>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

    this.getCurrentUser().subscribe(currentUserJSON => {
      this.currentUserNameBehavior.next(currentUserJSON.username);
      this.currentUserIdBehavior.next(currentUserJSON.id);
    })
  }


  public createUser(newUser: IUser) {
    //return this.httpClient.post(this.apiUrl + '/user/create', {newUser: newUser});
    return this.httpClient.post<IUser>(this.apiUrl + '/user/create', newUser)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  login(email: any, password: any) {
    return this.httpClient.post<IUser>(this.apiUrl + '/user/authenticate', { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  private getCurrentUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  // public checkValidUsername(username){
  //   let params = new HttpParams()
  //     .set('username', username)
  //   return this.httpClient.get(this.apiUrl + '/e-graph-server/profile/checkValidUser', { params: params });
  // }

}
