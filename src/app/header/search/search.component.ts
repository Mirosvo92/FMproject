import {Component, OnInit} from '@angular/core';
import {TracksService} from '../../shared/services/tracks.servise';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  valueInput = '';

  constructor(private tracksService: TracksService) { }

  ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.tracksService.getDataSearch(this.valueInput);
  }

}
