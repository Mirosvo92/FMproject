import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LoginService} from '../../shared/services/login.servise';


@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {
  dataUser = {};
  isUser = false;
  constructor(public loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.isUser = true;
      }
    });
  }
}
