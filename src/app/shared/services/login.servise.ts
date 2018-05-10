import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  user: User = {
    name: undefined,
    email: undefined,
    avatar: undefined
  };

  constructor(private firebaseAuth: AngularFireAuth, private route: Router) {

  }

  loginFacebook () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(() => this.getDataUser());
  }

  loginGmail () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  getDataUser() {
    this.firebaseAuth.authState.subscribe(user => {
      console.log(user);
      this.user.name = user.displayName;
      this.user.email = user.email;
      this.user.avatar = user.photoURL;
      localStorage.setItem('user', JSON.stringify(this.user));
      const test = localStorage.getItem('user');
    });
  }


}
