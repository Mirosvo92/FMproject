import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class TracksService {

  searchData = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) { }

  getData(method: string, limit: string) {
    const apiLink = `http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=b54ed2730d404ef000799945ec9aa5e5&&limit=${limit}&user=joanofarctan&format=json`;
    return this.httpClient.get(apiLink);
  }
  // search
  getDataSearch(searchValue: string) {
    const apiLink = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchValue}&api_key=b54ed2730d404ef000799945ec9aa5e5&format=json`;
    this.httpClient.get(apiLink).subscribe((data) => {
      if (Object.keys(data).length) {
        this.router.navigate(['']);
        this.searchData.next(data['results']['trackmatches']['track']);
      } else {
        this.searchData.next(false);
      }
    }, (error) => {
      console.log(error);
    });
  }
}
