import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { IonContent, IonRow, IonGrid, IonCol, IonImg, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonCol, IonGrid, IonRow, IonContent, CommonModule, FormsModule, RouterLink],
})
export class MainPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/tabs']);
      return;
    }
  }
}
