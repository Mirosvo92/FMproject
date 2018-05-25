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

  topTracksList: Track[] | Array<Track>;
  isLoader = false;
  title: string;

  constructor(private tracksService: TracksService, public favoriteService: FavoriteService) { }

  ngOnInit() {
    // for search
    this.tracksService.searchData.subscribe((data) => {
      if (data) {
        console.log(data);
        this.topTracksList = data['trackmatches']['track'];
        this.isLoader = true;
        this.title = 'Result search';
      } else {
        this.getTrackList();
      }
    }, (error) => {
      console.log(error);
    });
  }
  // get list
  getTrackList () {
    this.tracksService.getData('tag.gettoptracks&tag=rep', '40').subscribe((data) => {
      this.topTracksList = data['tracks']['track'];
      this.title = `top ${this.topTracksList.length}`;
      this.isLoader = true;
    }, (error) => {
      this.isLoader = true;
      console.log(error);
    });
  }


}
