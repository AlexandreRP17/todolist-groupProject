import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private toast : MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {

    if (this.email == '') {
      this.toast.open("Please enter email", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      return;
    }

    if (this.password == '') {
      this.toast.open("Please enter password", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      return;
    }

    this.auth.login(this.email, this.password);
    
    this.email = '';
    this.password = '';
    
  }

  singInWithGoogle() {
    this.auth.googleSignIn();
  }

}
