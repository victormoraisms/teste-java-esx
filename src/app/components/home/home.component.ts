import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateRoomModalComponent} from "./create-room/create-room-modal.component";
import {ChatroomService} from "../../services/chatroom.service";
import {IChatroom} from "../../model/chatroom.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rooms: any[] = []


  constructor(private userService: UserService,
              private matDialog: MatDialog,
              private router: Router,
              private chatroomService : ChatroomService) {

  }

  ngOnInit(): void {

    this.handleRooms();

  }


  handleRooms() {
    this.getRooms()
    setInterval(()=>{
      this.getRooms()
    }, 3000);
  }

  getRooms(){
    this.chatroomService.getRooms().subscribe( result => {
      if(result != null){
        this.rooms = result;
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

  openRoom(id:number){
    this.router.navigate(['/chat/' + id])
  }



}
