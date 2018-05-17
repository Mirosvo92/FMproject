import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../shared/services/favorite.servise';
import {LoginService} from '../../shared/services/login.servise';
import {Track} from '../../shared/interfaces/track';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteTracks: Track[];
  title = 'Favorites';
  userID: string;
  isLoader = false;

  constructor(private loginService: LoginService, private favoriteService: FavoriteService) { }

  ngOnInit() {
    // get user id
    this.loginService.user.subscribe( (user) => {
      if (user) {
        this.userID = user.uid;
        // get user id
        this.favoriteService.getListFavorite(this.userID).subscribe( (tracks) => {
          if (!tracks.length) {
            this.title = 'Empty';
          }
          this.favoriteTracks = tracks;
          this.isLoader = true;
        });
      }
    }, (error) => {
      this.isLoader = true;
      console.log(error);
    });
  }

  deleteFavorite(track: Track) {
    this.favoriteService.deleteFavoriteTrack(this.userID, track);
  }

}
