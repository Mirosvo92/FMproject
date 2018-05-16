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

  topTracksList: Track[] | boolean;
  isLoader = false;
  title = 'Top 40';

  constructor(private tracksService: TracksService, public favoriteService: FavoriteService) { }

  ngOnInit() {

    this.tracksService.searchData.subscribe((data) => {
      if (data) {
        this.title = 'Result search';
        this.topTracksList = data;
        this.isLoader = true;
      } else {
        this.title = 'Top 40';
        this.getTrackList();
      }
    }, (error) => {
      console.log(error);
    });
  }

  getTrackList () {
    // get list
    this.tracksService.getData('jazz', '40').subscribe((data) => {
      this.topTracksList = data['tracks']['track'];
      this.isLoader = true;
    }, (error) => {
      this.isLoader = true;
      console.log(error);
    });
  }




}
