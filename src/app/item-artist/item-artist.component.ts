import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'item-artist',
  templateUrl: './item-artist.component.html',
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, ],
})
export class ItemArtistComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  @Input() idArtist: string = ""
  @Input() artistName: string = 'artista';
  @Input() urlImage: string = 'https://via.placeholder.com/150';
  @Input() redirectTo?: string = '';

  public goToRoute(){
    this.router.navigate([`${this.redirectTo}/${this.idArtist}`])
  }
}
