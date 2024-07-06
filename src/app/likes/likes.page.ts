import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonItem,
  IonList,
  IonLabel,
  IonCardContent,
  IonThumbnail
} from '@ionic/angular/standalone';
import { SongSearchService } from '../services/song-search.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { BASE_IMAGE_LIKES } from 'src/constants';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonLabel,
    IonList,
    IonItem,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonImg,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonThumbnail,
    PlayButtomComponent
  ],
})
export class LikesPage implements OnInit {
  public imageBase = BASE_IMAGE_LIKES;

  constructor(
    private songSearchService: SongSearchService,
    private router: Router
  ) {
    addIcons({ addCircleOutline });
  }

  public songs: any = [];

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getAllLikes();
      this.songs = response;
    } catch (error) {
      console.error(error);
      this.router.navigate(['/tabs']);
    }
  }

  async goToSong(idSong: string) {
    this.router.navigate([`/song`, idSong]);
  }
}
