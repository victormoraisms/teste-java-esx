import { Component, OnInit } from '@angular/core';
import {ChatroomService} from "../../services/chatroom.service";
import {MessageModel} from "../../model/message.model";
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormControl } from '@angular/forms';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  formMessage;
  messages: any[] = [];
  users: any[] = [];

  constructor(private chatroomService: ChatroomService,
              private route : ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {

    this.formMessage = this.fb.group({
      message: ['']
    });
  }

  ngOnInit(): void {

    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.userService.setRoom(currentUser.id, parseInt(this.route.snapshot.params.id)).subscribe(result => {

    })
    this.handleMessages()
    this.handleUsers();
  }


  //Could be better implemented with sockets, but didn't had the time
  sendMessage(){

    const currentUser = JSON.parse(localStorage.getItem('user')!);

    const message = new MessageModel(this.formMessage.value.message, currentUser.username, parseInt(this.route.snapshot.params.id), new Date());

    this.formMessage = this.fb.group({
      message: new FormControl()
    });

    this.chatroomService.sendMessage(message).subscribe(result =>{
      this.getMessages()
    })



  }

  getMessages() {
    this.chatroomService.getMessages(parseInt(this.route.snapshot.params.id)).subscribe(result =>{
      this.messages = result;
    }, error => {
      console.error(error);
      this.messages = [];
    })
  }

  getUsers() {
    this.chatroomService.getCurrentsUsers(parseInt(this.route.snapshot.params.id)).subscribe(result =>{
        this.users = result;
    }, error => {
      console.error(error);
      this.messages = [];
    })
  }

  handleMessages() {
    this.getUsers()
      setInterval(()=>{
        this.getMessages()
      }, 3000);
    }

  handleUsers() {
    this.getUsers()
    setInterval(()=>{
      console.log("teste2",this.users.length);
      this.getUsers()
    }, 3000);
  }

  goHome() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.userService.leaveRoom(currentUser.id).subscribe(result => {})
    this.router.navigate(['/home'])
  }

  isOwnMessage(senderUsername: string){
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if(currentUser.username === senderUsername){
      return true
    }else{
      return false
    }
  }

}
