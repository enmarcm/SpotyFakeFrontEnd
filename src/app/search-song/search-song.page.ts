import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.page.html',
  styleUrls: ['./search-song.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,
    IonLabel,
    IonImg,
    IonAvatar,
    IonItem,
    IonList,
    IonSearchbar,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
  ],
})
export class SearchSongPage implements OnInit, AfterViewInit {
  public name: string = '';
  private loader: HTMLElement | null = null;
  public songs: any[] = [];
  private page: number = 0;
  private isLoading: boolean = false;
  private observer: IntersectionObserver | null = null;
  private isFirstLoad: boolean = true;

  constructor(
    private songSearchService: SongSearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.name = this.activatedRoute.snapshot.paramMap.get('name') || '';
  }

  searchNewSong(event: any) {
    const query = event.target.value.toLowerCase();
    this.router.navigate(['/searchSong', query]);
  }

  goToSong(songId: string) {
    console.log('songId', songId);
    this.router.navigate(['/song', songId]);
  }

  ngAfterViewInit(): void {
    this.loader = document.getElementById('loader');
    this.setupIntersectionObserver();
  }

  async ngOnInit() {
    await this.loadSongs();
  }

  async loadSongs() {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      await this.obtainNewSongs();
    } catch (error) {
      this.router.navigate(['/search']);
    } finally {
      this.isLoading = false;
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
      }
    }
  }

  async obtainNewSongs() {
    this.page += 1;

    const response = await this.songSearchService.getSongByName(
      this.name,
      this.page
    );
    if (response.length > 0) {
      this.songs = [...this.songs, ...response];

      console.log(this.songs);
    } else {
      if (this.observer) this.observer.disconnect();
      return;
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    this.observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        await this.loadSongs();
      }
    }, options);

    if (this.loader) this.observer.observe(this.loader);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
