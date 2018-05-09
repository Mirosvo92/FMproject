import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../shared/services/login.servise';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  @Input() signButton;

  constructor(public loginService: LoginService) {}

  ngOnInit() {}


}
