import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonContent,  CommonModule, FormsModule, RouterLink],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  public seconds: number = 10;
  public isClicked: boolean = false;

  ngOnInit() {
    localStorage.removeItem('token');

    const intervalId = setInterval(() => {
      if (this.seconds === 0) {
        clearInterval(intervalId);

        if(!this.isClicked){
          this.router.navigate(['/main']);
        }
        return;
      }
      this.seconds--;
    }, 1000);
  }
}
