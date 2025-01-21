import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Atractores } from './atractores';
@Component({
  selector: 'app-atractores',
  template: `
  <article id="art_atractores">
        <h2>Atractores y figuras que les orbitan</h2>
    <p id="descripcion_atractores">{{descripcion}}</p>
    <canvas id="canvas_atractores" (click)="pausar()" ></canvas>
  </article>
  `,
  styleUrls: ['./atractores.component.css']
})

export class AtractoresComponent implements AfterViewInit, OnDestroy {
  atractores?: Atractores | null;

  constructor() { }

  ngAfterViewInit() {
    this.atractores = new Atractores("canvas_atractores")
    this.atractores.ejecutar()
  }
  ngOnDestroy() {
    this.atractores!.composicion.animar = false
    delete this.atractores;
  }

  pausar() {
    this.atractores!.pausar()
  }

  descripcion: string = ''
}