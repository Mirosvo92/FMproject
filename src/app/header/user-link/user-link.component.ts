import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.servise';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {

  isUser = false;
  userName: string;
  userAvatar: string;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.isUser = true;
        this.userName = user.displayName;
        this.userAvatar = user.photoURL;
      } else {
        this.isUser = false;
      }
    });
  }
}
