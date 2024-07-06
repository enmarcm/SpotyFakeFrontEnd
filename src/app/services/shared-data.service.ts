import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ArtistInterface {
  id: string;
  name: string;
  followers: number;
  gneres: string[];
  urlImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private urlSongSource = new BehaviorSubject<string>('');
  currentUrlSong = this.urlSongSource.asObservable();
  
  private songNameSource = new BehaviorSubject<string>('');
  currentSongName = this.songNameSource.asObservable();
  
  private trackPhotoSource = new BehaviorSubject<string>('');
  currentTrackPhoto = this.trackPhotoSource.asObservable();
  
  private artistsSource = new BehaviorSubject<ArtistInterface[]>([]);
  currentArtists = this.artistsSource.asObservable();

  private artistsOutSource = new BehaviorSubject<any[]>([]);
  currentArtistsOut = this.artistsOutSource.asObservable();
  
  constructor() { }
  
  changeUrlSong(url: string) {
    this.urlSongSource.next(url);
    // console.log(this.urlSongSource)
  }

  changeSongName(name: string) {
    this.songNameSource.next(name);
  }

  changeTrackPhoto(photoUrl: string) {
    this.trackPhotoSource.next(photoUrl);
  }

  changeArtists(artists:ArtistInterface []) {
    this.artistsSource.next(artists);
    console.log(this.artistsSource)
  }

  changeArtistsOut(artists: any[]) {
    this.artistsOutSource.next(artists);
  }
}
