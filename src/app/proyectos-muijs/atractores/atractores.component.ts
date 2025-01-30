import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Atractores } from './atractores';
import { ProyectosMuijsComponent } from '../proyectos-muijs.component';
@Component({
  imports: [ProyectosMuijsComponent],
  selector: 'app-atractores',
  template: `
  <article class="proyecto">
    <app-proyectos-muijs></app-proyectos-muijs>
    <div class="contenido">
      <h2>Atractores y figuras que les orbitan</h2>
      <p class="descripcion_proyecto">{{descripcion}}</p>
      <canvas id="canvas_atractores" class="canvas_proyecto" (click)="pausar()" ></canvas>
    </div>
  </article>
  `,
  styleUrls: ['./atractores.component.css', '../proyecto.css']
})

export class AtractoresComponent implements AfterViewInit, OnDestroy {
  atractores?: Atractores | null;

  constructor() { }

  ngAfterViewInit() {
    this.atractores = new Atractores("canvas_atractores")
    this.atractores.ejecutar()
  }
  ngOnDestroy() {
    this.atractores?.composicion.cancelarAnimacion()
    this.atractores!.composicion.animar = false;
    delete this.atractores;
  }

  pausar() {
    this.atractores!.pausar()
  }

  descripcion: string = ''
}