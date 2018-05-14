import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TracksService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    const apiLink = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&api_key=b54ed2730d404ef000799945ec9aa5e5&&limit=10&format=json';
    return this.httpClient.get(apiLink);
  }
}
