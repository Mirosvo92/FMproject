import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {LoginService} from './login.servise';
import {Track} from '../interfaces/track';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FavoriteService {

  renderer: Renderer2;
  isUser = false;
  userId: string;

  constructor(private loginService: LoginService, private rendererFactory: RendererFactory2, private db: AngularFireDatabase) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
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
      const element = this.renderer.selectRootElement('.user-link__list-item-link');
      this.renderer.addClass(element, 'open');
      this.renderer.appendChild(element, this.renderer.createText('Sign In'));
    }
  }
  // add user in database
  addUserData(track: Track) {
    const path = `users/${this.userId}/favorite`;
    const data = {
      artist: track.artist,
      image: track.image[3]['#text'],
      name: track.name
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
