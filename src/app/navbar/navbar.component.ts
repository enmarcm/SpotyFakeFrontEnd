import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonMenu,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonMenuButton,
    IonButtons,
    IonMenu,
  ],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
