import { Component, OnInit } from '@angular/core';
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

  constructor(private chatService: ChatService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.chatMessages = this.db.list('/messages',  ref => ref.limitToLast(25)).valueChanges();
  }

  sendMessage(msg: string) {
    this.chatService.sendMessage(msg);
  }

}
