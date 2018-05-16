import {Injectable} from '@angular/core';
import {LoginService} from './login.servise';
import {Track} from '../interfaces/track';
import {AngularFireDatabase} from 'angularfire2/database';
import {OpenWindowSingIn} from './open-sing-in';


@Injectable()
export class FavoriteService {

  isUser = false;
  userId: string;

  constructor(private loginService: LoginService, private db: AngularFireDatabase, private openWindowSingIn: OpenWindowSingIn) {
    // get user
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.isUser = true;
        this.userId = user.uid;
      } else {
        this.isUser = false;
      }
    });
  }
  // add to favorite list
  addToFavoriteList(track: Track) {
    if (this.isUser) {
      this.addUserData(track);
    } else {
      this.openWindowSingIn.open();
    }
  }
  // add user in database
  addUserData(track: Track) {
    const path = `users/${this.userId}/favorite/${track.mbid}`;
    const data = {
      artist: track.artist,
      image: track.image[3]['#text'],
      name: track.name,
      id: track.mbid
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
  // get list favorites
  getListFavorite(idUser: string) {
    const path = `/users/${idUser}/favorite`;
    return this.db.list(path).valueChanges();
  }
  // delete favorite track
  deleteFavoriteTrack(idUser: string, track: Track) {
    const path = `/users/${idUser}/favorite/${track['id']}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }
}
