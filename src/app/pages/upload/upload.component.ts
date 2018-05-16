import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoginService} from '../../shared/services/login.servise';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private loginService: LoginService) {
  }

  ngOnInit() {
  }

}
