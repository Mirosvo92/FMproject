import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
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
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error));
  }
  // email sign up
  emailSignUp(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error));
  }


}


