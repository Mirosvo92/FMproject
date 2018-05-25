import {Component, OnInit} from '@angular/core';
import {ChatService} from '../shared/services/chat.servise';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatMessages: Observable<any>;
  pathUserId = '';
  isPrivate = false;
  activeUser: string;
  title = 'general';

  constructor(private chatService: ChatService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.chatMessages = this.db.list('/messages' ,  ref => ref.limitToLast(25)).valueChanges();


  }

  sendMessage(msg: HTMLInputElement) {
    if (!msg.value.length) {
      return false;
    }
    this.chatService.sendMessage(msg.value);
    msg.value = '';
  }
  // private messages
  privateMessage (msg: HTMLInputElement) {
    let path = `/messages/${this.activeUser}/${this.pathUserId}`;
    const data = {
      message: msg.value,
      timeSent: this.chatService.getTime(),
      userName: this.chatService.userName,
      email: this.chatService.userEmail
    };
    this.db.list(path).push(data);
    path = `/messages/${this.pathUserId}/${this.activeUser}`;
    this.db.list(path).push(data);
    msg.value = '';
  }
  // change field
  changeFieldMessage(data: {userId: string, userName: string , activeUserId: string}) {
    if (data.userName === 'general') {
      this.isPrivate = false;
      this.title = 'general';
      this.chatMessages = this.db.list('/messages' ,  ref => ref.limitToLast(25)).valueChanges();
    } else {
      this.isPrivate = true;
      this.title = data.userName;
      this.activeUser = data.activeUserId;
      this.pathUserId = data.userId;
      this.chatMessages = this.db.list(`/messages/${this.pathUserId}/${this.activeUser}`,  ref => ref.limitToLast(25)).valueChanges();
    }
  }
  // if user pass enter
  handleSubmit(event, msg: HTMLInputElement) {
    if (event.keyCode === 13) {
      !this.isPrivate ? this.sendMessage(msg) : this.privateMessage(msg);
    }
  }

}
