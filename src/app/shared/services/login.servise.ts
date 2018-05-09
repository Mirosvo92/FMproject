import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {User} from '../interfaces/user';

@Injectable()
export class LoginService {

  user: User = {
    name: undefined,
    email: undefined,
    avatar: undefined
  };


  constructor(private firebaseAuth: AngularFireAuth, private auth: AngularFireAuth) { }

  loginFacebook () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  loginGmail () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(() => {

    });
  }

  getDataUser() {
    this.auth.authState.subscribe(user => {
      this.user.name = user.displayName;
      this.user.email = user.displayName;
      this.user.avatar = user.displayName;
      localStorage.setItem('user', JSON.stringify(this.user));
      const test = localStorage.getItem('user');
      console.log(test);
    });
  }


}
