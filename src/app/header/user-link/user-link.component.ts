import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.servise';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {

  dataUser: any;
  // flag for user link
  isUser = false;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    // get dataUser
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.isUser = true;
        this.dataUser = user;
      } else {
        this.isUser = false;
        this.dataUser = user;
      }
    });
  }
}
