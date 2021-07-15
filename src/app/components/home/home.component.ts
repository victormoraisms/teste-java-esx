import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateRoomModalComponent} from "./create-room/create-room-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  currentUserName!: String;
  private currentUserNameSubscription!: Subscription
  loggedIn: boolean = false;

  constructor(private userService: UserService,
              private matDialog: MatDialog) {

  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.currentUserNameSubscription = this.userService.currentUserName.subscribe(name => {
      if(name != null){
        this.currentUserName = name;
        this.loggedIn = true;
      }

    })
  }

  logout(){
    this.userService.logout();
  }

  openCreateRoomModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%"
    dialogConfig.height = "auto"
    dialogConfig.id = 'create-room-dialog'
    this.matDialog.open(CreateRoomModalComponent, dialogConfig)
  }



}
