import {Component, OnInit} from '@angular/core';
import {TracksService} from '../../shared/services/tracks.servise';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  name = new FormControl();

  constructor(private tracksService: TracksService) { }

  ngOnInit() {
    const debounce = this.name.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    );
    debounce.subscribe(changes => {
      this.tracksService.getDataSearch(changes);
    });
  }

}
