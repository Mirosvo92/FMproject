import { Component, OnInit } from '@angular/core';
import {TracksService} from '../../shared/services/tracks.servise';
import {Track} from '../../shared/interfaces/track';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  topListAlbum: Track[];
  isLoader = false;
  title = 'Albums';

  constructor(private tracksService: TracksService) { }

  ngOnInit() {
    this.tracksService.getData('user.gettopalbums', '40').subscribe((data) => {
      this.topListAlbum = data['topalbums']['album'];
      console.log(this.topListAlbum);
      this.isLoader = true;
    }, (error) => {
      console.log(error);
    });
  }

}
