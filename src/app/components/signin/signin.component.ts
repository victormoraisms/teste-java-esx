import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;

  @ViewChild('incorrectPassword') incorrectPassword!: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private router : Router,
              private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  submit(){
    this.userService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.router.navigate(["/home"])
        },
        error: error => {
          //console.log(error)
          this.dialog.open(this.incorrectPassword);
        }
      });
  }

}
