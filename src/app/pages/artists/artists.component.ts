import { Component, OnInit } from '@angular/core';
import {Track} from '../../shared/interfaces/track';
import {TracksService} from '../../shared/services/tracks.servise';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artistList: Track[];
  isLoader = false;
  title = 'List of artists';

  constructor(private tracksService: TracksService) {
  }

  ngOnInit() {
    this.tracksService.getData('library.getartists', '40').subscribe((data) => {
      this.artistList = data['artists']['artist'];
      this.isLoader = true;
    }, (error) => {
      this.isLoader = true;
      console.log(error);
    });
  }

}
