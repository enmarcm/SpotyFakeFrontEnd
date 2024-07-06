import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-genre-song',
  templateUrl: './genre-song.page.html',
  styleUrls: ['./genre-song.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,
    IonLabel,
    IonImg,
    IonAvatar,
    IonItem,
    IonContent,
    IonList,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
  ],
})
export class GenreSongPage implements OnInit, AfterViewInit {
  songSearchService = inject(SongSearchService);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.genre = this.activatedRoute.snapshot.paramMap.get('genre') || '';
  }

  private loader: any;
  public genre: string = '';
  public songs: any = [];
  private page: number = 1;

  ngAfterViewInit(): void {
    this.loader = document.getElementById('loader');
  }

  async ngOnInit() {
    try {
      await this.obtainNewSongs();
      await this.setupIntersectionObserver();
    } catch (error) {
      this.router.navigate(['/search']);
    }
  }

  async obtainNewSongs() {
    try {
      this.page += 1;
      const response = await this.songSearchService.getSongsByGenre(
        this.genre,
        this.page
      );

      this.songs = [...this.songs, ...response] as any;
    } catch (error) {
      console.error(error);
    }
  }

  private async setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        await this.obtainNewSongs();
      }
    }, options);

    if (!this.loader) return;
    observer.observe(this.loader);
  }

  goToSong(songId: string) {
    console.log(this.songs);
    console.log('songId', songId);
    this.router.navigate(['/song', songId]);
  }
}
