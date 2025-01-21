import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proyectos-muijs',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="proyectos">
      <ul>
        <li><a [routerLink]="['/atractores']">Atractores</a></li>
        <li><a [routerLink]="['/vidaparticulas']">Partículas vivas</a></li>
        <li><a [routerLink]="['/atractorrebote']">Gravedad y colisión</a></li>
      </ul>
  </section>
  `,
  styleUrls: ['./proyectos-muijs.component.css']
})
export class ProyectosMuijsComponent {

}
