import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from '@/app/app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat() //aplanar
    .filter((route) => route && route.path) // filtrar quitando los que no tienen path
    .filter((route) => !route.path?.includes(':')) // filtar quitando la ruta dinamica ":"
    .filter((route) => !route.path?.includes('**')); // filtar quitando la ruta dinamica ":"
}
