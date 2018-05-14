import {Component, OnInit, Renderer2} from '@angular/core';
import {TracksService} from '../../shared/services/tracks.servise';
import {Track} from '../../shared/interfaces/track';
import {FavoriteService} from '../../shared/services/favorite.servise';
import {LoginService} from '../../shared/services/login.servise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topTracksList: Track[];
  isLoader = false;

  constructor(private tracksService: TracksService, public favoriteService: FavoriteService) { }

  ngOnInit() {
    // get list
    this.tracksService.getData('rap', '20').subscribe((data) => {
      this.topTracksList = data['tracks']['track'];
      this.isLoader = true;
    }, (error) => {
      this.isLoader = true;
      console.log(error);
    });
  }



}
