import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongSearchService } from '../services/song-search.service';
import { Router } from '@angular/router';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TypeaheadComponent } from '../typehead/typehead.component';
import { BASE_IMAGE_DEFAULT } from 'src/constants';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonItemSliding,
  IonAvatar,
  IonLabel,
  IonItemOption,
  IonItemOptions,
  IonModal,
  IonButtons,
  IonTextarea,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonTextarea,
    IonButtons,
    IonModal,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonAvatar,
    IonItemSliding,
    IonItem,
    IonList,
    IonCardTitle,
    IonCardHeader,
    IonImg,
    IonCard,
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
    TypeaheadComponent,
  ],
})
export class PlaylistsPage implements OnInit {
  public playlists: Array<Playlist> = [];
  public imageBase = BASE_IMAGE_DEFAULT;

  constructor(
    private songSearchService: SongSearchService,
    private router: Router
  ) {
    addIcons({ addCircleOutline });
  }

  public newPlaylist: any;

  public nombreProp2 = 'Hola';

  async ngOnInit() {
    try {
      this.newPlaylist = {
        playListname: 'Nombre Defecto',
        description: 'Primera vez',
        idSongs: [],
      };

      const response = await this.songSearchService.getPlaylists();

      this.playlists = response;
    } catch (error) {
      console.error(`Ocurrio un error`, error);
      this.router.navigate(['/tabs']);
    }
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.setOpen(false);
  }

  async confirm() {
    this.setOpen(false);
    const newFormatPlaylist = {
      name: this.newPlaylist.playListname,
      idSongs: this.selectedSongs,
      description: this.newPlaylist.description,
    };

    console.log(newFormatPlaylist);

    try {
      const response = await this.songSearchService.newPlaylist(
        newFormatPlaylist
      );

      if (response?.error) {
        throw response.error;
      }

      this.playlists = await this.songSearchService.getPlaylists();
    } catch (error) {
      console.error(`Ocurrio un error`, error);
    } finally {
      this.selectedSongs = [];
      this.songs = [];
    }
  }

  deletePlaylist = async (playlistId: string) => {
    try {
      const response = await this.songSearchService.deletePlaylist(playlistId);

      if (response?.error) {
        throw response.error;
      }

      this.playlists = await this.songSearchService.getPlaylists();
    } catch (error) {
      console.error(`Ocurrio un error`, error);
    }
  };

  goToPlaylist = (playlistId: string) =>
    this.router.navigate(['/playlist', playlistId]);

  // TODO: QUITAR ESTO
  public isModalOptions = false;
  public selectedSongsText = '0 Items';
  public selectedSongs = [];
  public songs = [] as any;
  public page = 0;
  public prevName = '';

  public obtainSongByName = async (name: string) => {
    try {
      this.prevName = name;
      if (this.prevName !== name) {
        this.page += 1;
      } else {
        this.page = 1;
      }
      const parsedName = name.trim().replace(/ /g, '%20');

      const response = await this.songSearchService.getSongByName(
        parsedName,
        this.page
      );

      if (response.length > 0) {
        this.songs = [...this.songs, ...response];
      } else {
      }

      return this.songs;
    } catch (error) {
      console.error(`Ocurrio un error`, error);
    }
  };

  public updateSelectedItems(event: any) {
    this.selectedSongs = event;
  }

  private formatData(data: Array<{ id: string; text: string }>) {
    if (data.length === 1) {
      return data[0].text;
    }

    return `${data.length} items`;
  }

  selectionChange(items: Array<{ id: string; text: string }>) {
    this.selectedSongs = items as any;

    this.selectedSongsText = this.formatData(items);

    this.isModalOptions = false;
  }

  goToLikes() {}
}

interface Playlist {
  idSongs: Array<string>;
  name: string;
  id: string;
  _id: string;
  description: string;
  image: string;
  songs: Array<any>;
}
