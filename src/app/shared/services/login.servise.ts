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

  constructor(private afAuth: AngularFireAuth, private route: Router) {
    firebase.auth().getRedirectResult().then(function(authData) {
      console.log(authData);
    }).catch(function(error) {
      console.log(error);
    });
  }

  loginFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);

  }

  loginGmail () {
    this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  // getDataUser() {
  //   this.firebaseAuth.authState.subscribe(user => {
  //     this.user.name = user.displayName;
  //     this.user.email = user.displayName;
  //     this.user.avatar = user.displayName;
  //     localStorage.setItem('user', JSON.stringify(this.user));
  //     const test = localStorage.getItem('user');
  //   });
  // }


}
