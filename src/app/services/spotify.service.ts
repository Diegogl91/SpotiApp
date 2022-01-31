import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query:string ){
    const url = `https://api.spotify.com/v1/${query}`
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA4mwym_UkzM8gCkenYAgdTCgmamBFs5TRM8LvS6yV4sR90MT10xnafJrMKjSDMvtRzxYGdhN5DICmrYFs'
    });
    return this.http.get(url, { headers })
  }


  getNewReleases(){

    return this.getQuery('browse/new-releases')
      .pipe( map( (data:any) => data.albums.items ));

  }

  getArtistas ( termino: string ){

    return this.getQuery(`search?query=${ termino }&type=artist&locale=es-419%2Ces%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=20`)
      .pipe( map( (data:any) => data.artists.items ));
  }

  getArtista ( id: string ){
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks ( id: string ){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( (data:any) => data.tracks));
  }


}

