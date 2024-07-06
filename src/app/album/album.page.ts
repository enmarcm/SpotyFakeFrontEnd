import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SongSearchService } from '../services/song-search.service';
import getDominantColorHex from 'src/utils/getColorFromUrl';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardHeader,
  IonList,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonThumbnail,
  IonLabel,
} from '@ionic/angular/standalone';
import { MusicPlayerService } from '../services/music-player.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonCardHeader,
    IonCard,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
    PlayButtomComponent,
    IonThumbnail,
  ],
})
export class AlbumPage implements OnInit {
  songSearchService = inject(SongSearchService);

  public idAlbum: string = '';
  public name: string = '';
  public urlImage: string = '';
  public date: string = '';
  public totalTracks: number = 0;
  public artists: Array<any> = [];
  public songs: Array<any> = [];
  public dominantColor = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private musicPlayerService: MusicPlayerService, private sharedDataService: SharedDataService) {
    this.idAlbum = this.activatedRoute.snapshot.paramMap.get('idAlbum') || '';
  }

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getAlbumInfo(this.idAlbum);
      this.dominantColor = await getDominantColorHex(response.urlImage);
      this.idAlbum = response.id;
      this.name = response.name;
      this.urlImage = response.urlImage;
      this.date = response.release_date;
      this.totalTracks = response.total_tracks;
      this.artists = response.artists;
      this.songs = response.songs;
    } catch (error) {
      this.router.navigate(['/home']);
    }
  }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToArtist(idArtist: string) {
    this.router.navigate(['/artist', idArtist]);
  }

  async playAlbum() {
    this.musicPlayerService.setPlaylist(this.songs);
    this.musicPlayerService.play(this.songs[0].url_song);
      this.sharedDataService.changeSongName(this.songs[0].name);
      this.sharedDataService.changeArtists(this.artists);
      this.sharedDataService.changeTrackPhoto(this.urlImage);
  }
}
