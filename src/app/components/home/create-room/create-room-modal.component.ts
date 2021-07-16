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

  name!: string;
  chatId: any;

  constructor(private dialogRef: MatDialogRef<CreateRoomModalComponent>,
              private chatRoomService : ChatroomService,
              private router : Router) {

  }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }

  createRoom(){

    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.chatRoomService.createRoom(this.name, currentUser.id).subscribe( result => {

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
