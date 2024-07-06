import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonThumbnail, IonList } from '@ionic/angular/standalone';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_IMAGE_DEFAULT } from 'src/constants';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.page.html',
  styleUrls: ['./playlist-item.page.scss'],
  standalone: true,
  imports: [IonList, 
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonThumbnail,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    PlayButtomComponent,
  ],
})
export class PlaylistItemPage implements OnInit {
  public songSearchService = inject(SongSearchService);
  public imageBase = BASE_IMAGE_DEFAULT;

  public PlaylistItem: PlaylistItemInterface = {
    id: '',
    name: '',
    description: '',
    idSongs: [],
    idUser: '',
    songs: [],
  };

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getPlaylistById(
        this.PlaylistItem.id
      );

      this.PlaylistItem = response;
    } catch (error) {
      console.error(error);
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.PlaylistItem.id =
      this.activatedRoute.snapshot.paramMap.get('idPlaylist') || '';
  }

  

  goToSong(idSong: string) {
    this.router.navigate([`/song`, idSong]);
  }
}

interface PlaylistItemInterface {
  id: string;
  name: string;
  description: string;
  idSongs: Array<string>;
  idUser: string;
  songs: Array<SongInterface>;
}

interface SongInterface {
  idArtist: Array<string>;
  artistNames: Array<string>;
  name: string;
  duration: number;
  date: string;
  urlImage: string;
  urlSong: string;
  genres: Array<string>;
  albumName: string;
  id: string;
}
