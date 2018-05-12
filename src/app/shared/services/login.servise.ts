import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private route: Router) {
    this.user = firebaseAuth.authState;
  }
  // login facebook
  loginFacebook () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).catch(error => console.log(error));
  }
  // login gmail
  loginGmail () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).catch(error => console.log(error));
  }
  // sign out
  signOut () {
    this.firebaseAuth.auth.signOut()
      .catch(error => console.log(error));
  }


}


