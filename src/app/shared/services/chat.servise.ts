import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoginService} from './login.servise';
import * as firebase from 'firebase';

@Injectable()
export class ChatService {

  user: firebase.User;
  userName: string;
  userEmail: string;
  now = new Date();

  constructor(private db: AngularFireDatabase, private loginService: LoginService) {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;
        this.user = user;
        // add user in database
        this.setUserData(user);
      } else {
        this.userName = 'anonymous';
        this.userEmail = 'anonymous';
      }
    });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTime();
    this.db.list('/messages').push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: this.userEmail
    });
  }

  getTime() {
    const date = this.now.getFullYear() + '/' + (this.now.getMonth() + 1) + '/' + this.now.getDate();
    const time = this.now.getHours() + ':' + this.now.getMinutes() + ':' + this.now.getSeconds();
    return (date + ' ' + time);
  }

  // add user in database
  setUserData(user: firebase.User) {
    const path = `users/${user.uid}`;
    const data = {
      displayName: user.displayName,
      uid: user.uid
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
  // for giving users list
  getUsers() {
    const path = '/users';
    return this.db.list(path).valueChanges();
  }

}
