import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;

  addUser = this.fb.group({
    username: [''],
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.userService.createUser(this.addUser.getRawValue()).subscribe( result => {
    }, () => {

    }, () => {
      this.router.navigate(["/home"]);
    });
  }

}
