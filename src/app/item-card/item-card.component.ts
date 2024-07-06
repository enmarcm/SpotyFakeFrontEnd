import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonImg, IonCard, ],
})
export class ItemCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  @Input() songName: string = 'cancion';
  @Input() artistName: string[] = [];
  @Input() urlImage: string =
    'https://ionicframework.com/docs/img/demos/card-media.png';
  @Input() idSong: string = 'id';
  @Input() redirectTo?: string = '';

  public goToRoute() {
    this.router.navigate([`${this.redirectTo}/${this.idSong}`]);
  }
}
