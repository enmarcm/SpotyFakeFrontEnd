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
// import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_IMAGE_DEFAULT } from 'src/constants';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { MusicPlayerService } from '../services/music-player.service';
import { SharedDataService } from '../services/shared-data.service';

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
      // await this.presentLoading();
      const response = await this.songSearchService.getPlaylistById(
        this.PlaylistItem.id
      );
      
      console.log('response of playlist', response);
      this.PlaylistItem = response;
    } catch (error) {
      // this.presentToastSuccess('bottom');
    } finally {
      // await this.dismissLoading();
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService,
    // public loadingController: LoadingController,
    // public toastController: ToastController,
    private router: Router
  ) {
    this.PlaylistItem.id =
      this.activatedRoute.snapshot.paramMap.get('idPlaylist') || '';
  }

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     translucent: false,
  //     animated: true,
  //     spinner: 'bubbles',
  //     cssClass: 'custom-loader-songs',
  //   });

  //   return await loading.present();
  // }

  // async dismissLoading() {
  //   return await this.loadingController.dismiss();
  // }

  // async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
  //   const toast = await this.toastController.create({
  //     message: `Se obtuvo la playlist ${this.PlaylistItem.name}!`,
  //     duration: 500,
  //     position: position,
  //     color: 'success',
  //   });

  //   await toast.present();
  // }

  // async presentToastError(
  //   position: 'top' | 'middle' | 'bottom' = 'bottom',
  //   error: any
  // ) {
  //   const toast = await this.toastController.create({
  //     message: 'Error al cargar la canción',
  //     duration: 1500,
  //     position: position,
  //     color: 'danger',
  //   });

  //   await toast.present();
  // }

  goToSong(idSong: string) {
    this.router.navigate([`/song`, idSong]);
  }

  async playPlaylist() {
    this.musicPlayerService.setPlaylist(this.PlaylistItem.songs);
    this.musicPlayerService.play(this.PlaylistItem.songs[0].urlSong);
    this.sharedDataService.changeArtistsOut(this.PlaylistItem.songs[0].artistNames);
    this.sharedDataService.changeSongName(this.PlaylistItem.songs[0].name);
    this.sharedDataService.changeTrackPhoto(this.PlaylistItem.songs[0].urlImage);
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
