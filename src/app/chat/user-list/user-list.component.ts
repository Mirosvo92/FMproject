import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from '../../shared/services/chat.servise';
import {LoginService} from '../../shared/services/login.servise';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<any>;
  activeUserId: string;
  @Output() changeField = new EventEmitter<{userId: string, userName: string , activeUserId: string}>();

  constructor(private chat: ChatService, private loginService: LoginService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.activeUserId = user.uid;
      }
    });
    this.chat.getUsers().subscribe(users => {
      this.users = users.filter(item => item['uid'] !== this.activeUserId );
    });
  }

  privateMessage (user?: {uid: string, displayName: string}) {
    if (user) {
      this.changeField.emit({userId: user.uid, userName: user.displayName , activeUserId: this.activeUserId});
    } else {
      this.changeField.emit({userId: '0', userName: 'general' , activeUserId: this.activeUserId});
    }
  }

}
