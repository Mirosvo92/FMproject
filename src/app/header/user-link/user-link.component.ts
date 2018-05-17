import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.servise';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {

  isUser = false;
  user: firebase.User;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.isUser = true;
        this.user = user;
      } else {
        this.isUser = false;
      }
    });
  }
}
