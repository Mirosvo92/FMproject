import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  @Input() signButton;

  constructor(public afAuth: AngularFireAuth) {
    console.log(afAuth.authState);
  }

  ngOnInit() {

  }

}
