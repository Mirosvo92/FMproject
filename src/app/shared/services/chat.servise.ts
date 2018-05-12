import {Injectable} from '@angular/core';
import {ChatMessage} from '../interfaces/chatMessage';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoginService} from './login.servise';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  user: firebase.User;
  userName: string;
  userEmail: string;

  constructor(private db: AngularFireDatabase, private loginService: LoginService) {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;
        console.log(this.userName);
        console.log(user);
        // add user in database
        this.setUserData(user);
      }
    });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTime();
    // const email = this.user.email;
    this.db.list('/messages').push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: this.userEmail
    });
  }

  getTime() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    return (date + ' ' + time);
  }

  // add user in database
  setUserData(user: firebase.User) {
    const path = `users/${user.uid}`;
    const data = {
      email: user.email,
      displayName: user.displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

}
