import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginService {

  user = new Subject();

  constructor(private firebaseAuth: AngularFireAuth, private route: Router) {
    this.firebaseAuth.authState.subscribe(user => {
      this.user.next(user);
    });
  }
  // login facebook
  loginFacebook () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }
  // login gmail
  loginGmail () {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

}
