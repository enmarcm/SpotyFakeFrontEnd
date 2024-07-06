import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable, Subscription, filter } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, NavbarComponent, MusicPlayerComponent, CommonModule, LoaderComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: Observable<boolean>;
  public realLoading: boolean = false;


  shouldRenderMenu: boolean;
  selectedSongUrl: string= "";
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router, private loaderService: LoaderService) {
    this.shouldRenderMenu = ![
      '/',
      '/auth/login',
      '/auth/register',
      '/logout',
      '/main',
    ].includes(this.router.url);
    this.isLoading = this.loaderService.loading$;
    
    this.isLoading.subscribe((loading) => {
      console.log('isLoading:', loading);
      this.realLoading = loading;
    });
  }

  ngOnInit() {
    this.updateMenuVisibility();
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMenuVisibility();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  selectSong(url: string) {
    this.selectedSongUrl = url;
    // You might also want to ensure shouldRenderMenu is true here
  }

  private updateMenuVisibility() {
    this.shouldRenderMenu = ![
      '/',
      '/auth/login',
      '/auth/register',
      '/logout',
      '/main',
    ].includes(this.router.url);
    console.log(this.router.url, this.shouldRenderMenu);
  }

}
