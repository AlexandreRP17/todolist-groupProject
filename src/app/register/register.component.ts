import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  user: any = {
    fullName: '',
    email: '',
    password: ''
  }
  

  constructor(private auth : AuthService, private toast : MatSnackBar, private store: AngularFirestore) { }

  ngOnInit(): void {
  }

  register() {

    if (this.user.email == '') {
      this.toast.open("Please enter email", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      return;
    }

    if (this.user.password == '') {
      this.toast.open("Please enter password", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      return;
    }

    this.auth.register(this.user.email, this.user.password);
    
    this.user.email = '';
    this.user.password = '';
    
  }

}

