import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, search, barcodeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonTabButton, IonTabBar, IonTabs, ],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {
    addIcons({ home, search, barcodeOutline });
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
