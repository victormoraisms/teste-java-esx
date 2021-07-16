import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  usernameAlreadyUsed: boolean = false;

  @ViewChild('userAlreadyUsed') userAlreadyUsed!: TemplateRef<any>;

  addUser = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async checkUsername() {
    await this.userService.checkValidUsername(this.addUser.controls['username'].value).toPromise().then(data => {
      if (!data) {
        this.usernameAlreadyUsed = true
      }else{
        this.usernameAlreadyUsed = false
      }
    })
  }

  createUser(){

    if(this.usernameAlreadyUsed){
      this.dialog.open(this.userAlreadyUsed);
      return;
    }

    this.userService.createUser(this.addUser.getRawValue()).subscribe( result => {
    }, () => {

    }, () => {
      this.router.navigate(["/home"]);
    });
  }

}
