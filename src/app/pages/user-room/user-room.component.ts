import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../shared/services/login.servise';
import {AngularFireStorage} from 'angularfire2/storage';
import * as firebase from 'firebase';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.scss']
})
export class UserRoomComponent implements OnInit {

  user: any;
  form: FormGroup;

  constructor(public loginService: LoginService, private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.user = user;
        // form
        this.form.setValue({
          name: user.displayName
        });
      }
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  changeAvatar(event) {
    const file = event.target.files[0];
    const uploadTask = this.storage.upload(`/images/avatars/user_${this.user.uid}_avatar.png`, file);
    uploadTask.downloadURL().subscribe(url => {
      this.user.updateProfile({
        displayName: this.user.name,
        photoURL: url
      }).catch(error => console.log(error));
    });
  }

  deleteAvatar() {
    const path = `/images/avatars/user_${this.user.uid}_avatar.png`;
    const storageRef = firebase.storage().ref();
    storageRef.child(path).delete().then(() => {
      this.user.updateProfile({
        displayName: this.user.name,
        photoURL: ''
      }).catch(error => console.log(error));
    });
  }

  submitUserForm() {
    this.user.updateProfile({
      displayName: this.form.value.name,
      photoURL: this.user.photoURL
    }).catch(error => console.log(error));
  }
  // delete user
  deleteUser() {
    const user = firebase.auth().currentUser;
    const path = `users/${this.user.uid}`;
    // del user from firebase
    user.delete().catch(function(error) {
      console.log(error);
    });
    // del user from database
    this.db.list(path).remove();
    this.loginService.signOut();
  }

}
