import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { getDatabase, ref, set } from "firebase/database";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface User {
  uid: string;
  fullName: string;
  email: string;
  
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private fireauth : AngularFireAuth, private router : Router, private toast : MatSnackBar, private store : AngularFirestore) { }

  
  //login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
      localStorage.setItem('token', 'true');
      this.toast.open("Logged in successfully", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['todo'])
    }, err => {
      this.toast.open(err.message, "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email : string, password : string, fullName : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      this.toast.open("Registration Successfully", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
    }, err => {
      this.toast.open(err.message, "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
      this.router.navigate(['/register']);
    })
  }

  //sing out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.toast.open(err.message, "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
    })
  }

  //forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.toast.open("The reset link has been sent to you!", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
    }, err => {
      this.toast.open(err.message, "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      //this.router.navigate(['/login']);
    })
  
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.toast.open("Logged in successfully", "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/todo']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      this.toast.open(err.message, "close", {duration: 5000, verticalPosition: 'top',
      horizontalPosition: 'right'});
      this.router.navigate(['/login']);
    })
  }


 }