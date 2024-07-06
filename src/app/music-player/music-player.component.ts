import { Component, Input, OnInit } from '@angular/core';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { JoinArtistsPipe } from '../services/joinArtists';
import { MusicPlayerService } from '../services/music-player.service';
import { CommonModule } from '@angular/common';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SharedDataService } from '../services/shared-data.service';
import { FormsModule } from '@angular/forms';
import { ModalPlayerComponent } from '../modal-player/modal-player.component';
import {ModalController} from '@ionic/angular';
import { IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, IonModal, IonHeader, IonTitle, IonContent } from "@ionic/angular/standalone";

interface ArtistInterface {
  id: string;
  name: string;
  followers: number;
  gneres: string[];
  urlImage: string;
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  imports: [IonContent, IonTitle, IonHeader, IonModal, IonIcon, IonButton, IonButtons, IonToolbar, IonFooter, 
    
    CommonModule,
    PlayButtomComponent,
    JoinArtistsPipe,
    FormsModule,
  ],
  standalone: true,
})
export class MusicPlayerComponent implements OnInit {
  songUrl: string = '';
  isPlaying: boolean = false;
  public idSong: string = '';
  public name: string = '';
  public duration: number = 0;
  public artists: Array<ArtistInterface> = [];
  public artistsOut: Array<any> = [];
  public album: {
    name: string;
    urlImage: string;
    id: string;
  } = {} as any;
  public date: string = '';
  public urlImage: string = '';
  public urlSong: string = '';
  public dominantColor: string = '';
  public formattedDuration = '';
  public currentAudioPosition = 0;
  showArtistsOut: boolean = false;
  currentTrack: any;
  isAlbum: boolean; // Add this property
  currentSong: string; // Add this property
  nextTrack: { name: string };
  constructor(
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService,
    public modalController: ModalController
  ) {
    addIcons({ play, pause });
     this.nextTrack = { name: '' };
    this.isAlbum = false; // Initialize this property
    this.currentSong = ''; // Initialize this property
  }
  
  isShow() {
    return (
      this.songUrl != null && this.songUrl != '' && this.songUrl != undefined
    );
  }
  
  ngOnInit() {
    this.nextTrack = this.musicPlayerService.getNextTrack();
    this.musicPlayerService.songUrl$.subscribe((url) => {
      if (!url || url === null) return;
      
      this.songUrl = url;
      const audio = this.musicPlayerService.audio;
      audio.addEventListener('timeupdate', this.updateProgressBar, false);
      audio.addEventListener('timeupdate', this.updateProgressBarModal, false);
      audio.addEventListener('ended', this.checkProgressBar, false);
    });
    this.musicPlayerService.playStatus$.subscribe((status) => {
      this.isPlaying = status;
    });
    this.sharedDataService.currentUrlSong.subscribe(
      (url) => (this.urlSong = url)
    );
    this.sharedDataService.currentArtists.subscribe(
      (artists) => (this.artists = artists,
        this.showArtistsOut = false,
        this.isAlbum = true
      )
    );
    this.sharedDataService.currentArtistsOut.subscribe(
      (artistsOut) => (this.artistsOut = artistsOut,
        this.showArtistsOut = true
      )
    );
    this.sharedDataService.currentSongName.subscribe(
      (name) => (this.name = name,
        this.isAlbum = false
      )
    );
    this.sharedDataService.currentTrackPhoto.subscribe(
      (photo) => (this.urlImage = photo)
    );
    this.musicPlayerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
      this.nextTrack = this.musicPlayerService.getNextTrack();
      console.log('Current Track:', this.currentTrack); // Debugging line
      this.isAlbum = true; // Assuming track has an albumIdproperty
      this.currentSong = track.name; 
    });


  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying && this.urlSong) {
      this.musicPlayerService.resume();
      console.log(this.isAlbum)
      console.log(this.currentTrack)
      console.log(this.artists)
    } else {
      this.musicPlayerService.pause(); // Pause the song
    }
  }

  

  pause() {
    this.musicPlayerService.pause();
  }

  isModalOpen = false;
  async OpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async CloseModal() {
    this.OpenModal(false);
  }

  updateProgressBar = () => {
    const audio = this.musicPlayerService.audio;
    const progressBar = document.getElementById('audioProgress') as HTMLProgressElement;
    if (progressBar && audio && isFinite(audio.currentTime) && isFinite(audio.duration) && audio.duration > 0) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
    } else if (progressBar) {
      progressBar.value = 0; // Set to 0 or a sensible default if conditions are not met
    }
  }
  
  updateProgressBarModal = () => {
    const audio = this.musicPlayerService.audio;
    const progressBar = document.getElementById('audioProgressModal') as HTMLProgressElement;
    if (progressBar && audio && isFinite(audio.currentTime) && isFinite(audio.duration) && audio.duration > 0) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
    } else if (progressBar) {
      progressBar.value = 0; // Set to 0 or a sensible default if conditions are not met
    }
  }

  checkProgressBar = () => {
    const progressBar = document.getElementById('audioProgress') as HTMLProgressElement;
    if (progressBar) {
      progressBar.value == 100;
      this.nextSong();
    }
  }


  nextSong() {
    // Increment the song index or loop back to the start
    this.musicPlayerService.playNext();
  }
  
  previousSong() {
    // Decrement the song index or loop to the end
    this.musicPlayerService.playPrevious();
  }

}
