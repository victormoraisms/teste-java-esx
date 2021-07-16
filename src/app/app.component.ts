import {AfterViewInit, Component, OnChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "./services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ChatroomService} from "./services/chatroom.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'esx-test';
  user: any = {};


  constructor(private userService: UserService,
              private router: Router) {

  }

  userLogged() {
    this.user = JSON.parse(localStorage.getItem('user')!)
    return this.user;
  }

  logout(){
    this.userService.leaveRoom(this.user.id).subscribe(result => {})
    this.userService.logout();

  }

  goHome() {
    this.userService.leaveRoom(this.user.id).subscribe(result => {})
    this.router.navigate(['/home'])
  }
}
