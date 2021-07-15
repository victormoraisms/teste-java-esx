import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {ChatroomService} from "../../../services/chatroom.service";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.css']
})
export class CreateRoomModalComponent implements OnInit {

  private currentUserIdSubscription!: Subscription

  name!: string;
  chatId: any;
  userId: any;

  constructor(private dialogRef: MatDialogRef<CreateRoomModalComponent>,
              private chatRoomService : ChatroomService,
              private router : Router,
              private userService: UserService) {
    this.currentUserIdSubscription =  userService.currentUserId.subscribe( id => {
        if(id != null){
          this.userId = id;
        }
      });
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }

  createRoom(){

    this.chatRoomService.createRoom(this.name, this.userId).subscribe( result => {

      if(result != null){
        this.chatId = result;
      }

    }, () => {

      },
      () => {
        this.closeModal()
        this.router.navigate(["/chat/" + this.chatId])
      })

  }

}
