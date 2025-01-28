import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ReboteContenedor } from './01-rebote-entorno';

@Component({
  selector: 'app-rebote-contenedor',
  imports: [],
  template: `
  <article id="art_rebote_contenedor">
    <h2>Rebote</h2>
    <canvas id="canvas_rebote_contenedor" (click)="pausar()"></canvas>
    <p id="descripcion_rebote_contenedor" [innerHTML]="descripcion" ></p>
  </article>
  `,
  styleUrl: './rebote-contenedor.component.css'
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

  descripcion: string = `Conjunto de partículas instruídas para relacionarse entre sí de modos distintos según su tipo `
    + `<br\>`
    + `Dependiendo de cómo se configuren las interacciones entre partículas, pueden emerger espontáneamente comportamientos que hagan que grupos de partículas parezcan organismos vivos.`
}

