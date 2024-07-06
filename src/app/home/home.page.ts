import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import songsMocks from '../../mocks/music.json';
import artistMocks from '../../mocks/artist.json';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemArtistComponent } from '../item-artist/item-artist.component';
import albumMocks from '../../mocks/album.json';
import { SongSearchService } from '../services/song-search.service';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,

    ItemCardComponent,
    ItemArtistComponent,
  ],
})
export class HomePage implements OnInit {
  songSearchService = inject(SongSearchService);

  constructor() {}

  public songs: any[] = songsMocks;
  public artists: any[] = artistMocks;
  public albums: any[] = albumMocks;

  async ngOnInit() {
    try {
      const responseSongs = await this.songSearchService.getTopSongs();
      const responseArtists = await this.songSearchService.getTopArtist();
      const responseAlbums = await this.songSearchService.getNewAlbums();

      this.songs = responseSongs;
      this.artists = responseArtists;
      this.albums = responseAlbums;
    } catch (error) {
      console.error(error);
    }
  }
}
