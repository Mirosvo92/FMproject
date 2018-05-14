import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TracksService {

  constructor(private httpClient: HttpClient) { }

  getData(name: string, limit: string) {
    const apiLink = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${name}&api_key=b54ed2730d404ef000799945ec9aa5e5&&limit=${limit}&format=json`;
    return this.httpClient.get(apiLink);
  }
}
