import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proyectos-muijs',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="ejemplos">
      <ul class="ejemplos-links">
        <a [routerLink]="['/ejemplos/atractores']"><li class="ejemplos-link">Atractores</li></a>
        <a [routerLink]="['/ejemplos/vidaparticulas']"><li class="ejemplos-link">Partículas vivas</li></a>
        <a [routerLink]="['/ejemplos/atractorrebote']"><li class="ejemplos-link">Gravedad y colisión</li></a>
        <a [routerLink]="['/ejemplos/rebotecontenedor']"><li class="ejemplos-link">Rebote y contenedor</li></a>
        <!-- <li class="ejemplos-link"><a [routerLink]="['/atractores']">Atractores</a></li>
        <li class="ejemplos-link"><a [routerLink]="['/vidaparticulas']">Partículas vivas</a></li>
        <li class="ejemplos-link"><a [routerLink]="['/atractorrebote']">Gravedad y colisión</a></li> -->
      </ul>
  </section>
  `,
  styleUrls: ['./proyectos-muijs.component.css']
})
export class ProyectosMuijsComponent {

}
