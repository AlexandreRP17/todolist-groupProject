import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService, private toast : MatSnackBar) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    if (this.email == '') {
      this.toast.open("Please enter email", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      return;
    }

    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
