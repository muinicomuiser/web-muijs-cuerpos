import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ReboteContenedor } from './01-rebote-entorno';
import { ProyectosMuijsComponent } from '../proyectos-muijs.component';

@Component({
  selector: 'app-rebote-contenedor',
  imports: [ProyectosMuijsComponent],
  template: `
  <article class="proyecto">
    <app-proyectos-muijs></app-proyectos-muijs>
    <div class="contenido">
      <h2>Rebote y contenedor</h2>
      <canvas id="canvas_rebote_contenedor" class="canvas_proyecto" (click)="pausar()"></canvas>
      <p class="descripcion_proyecto" [innerHTML]="descripcion" ></p>
    </div>
  </article>
  `,
  styleUrls: ['./rebote-contenedor.component.css', '../proyecto.css']
})

export class ReboteContenedorComponent implements AfterViewInit, OnDestroy {
  reboteContenedor?: ReboteContenedor | null;

  constructor() { }

  ngAfterViewInit() {
    this.reboteContenedor = new ReboteContenedor("canvas_rebote_contenedor")
    this.reboteContenedor.ejecutar()
  }
  ngOnDestroy() {
    this.reboteContenedor!.composicion.animar = false
    delete this.reboteContenedor;
  }

  pausar() {
    this.reboteContenedor!.pausar()
  }

  descripcion: string = `Conjunto de cuerpos atrapados en un contenedor, que son atraídas por un objeto que les orbita.`
    + `<br\>`
  // + `Dependiendo de cómo se configuren las interacciones entre partículas, pueden emerger espontáneamente comportamientos que hagan que grupos de partículas parezcan organismos vivos.`
}

