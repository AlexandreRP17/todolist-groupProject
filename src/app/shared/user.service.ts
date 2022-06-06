import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserApp } from '../models/user-app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store : AngularFirestore) { }

  updateUser(id: string, fullName: string, email: string){
    return this.store.doc('/users/'+id).set({
      fullName: fullName,
      email: email
    }, {merge: true}).then(() => {
      console.log('user saved')
    }).catch((reason: any) => {
      console.log('user was not saved', reason)
    })
  }

  getUser(id: string): Observable<UserApp>{
    return this.store.doc('user/'+id).valueChanges() as Observable<UserApp>
  }
}
