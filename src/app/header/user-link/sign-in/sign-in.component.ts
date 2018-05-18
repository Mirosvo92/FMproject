import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../shared/services/login.servise';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  @Input() signButton;
  form: FormGroup;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signIn() {
    this.loginService.emailSignIn(this.form.value.email, this.form.value.password);
  }

}
