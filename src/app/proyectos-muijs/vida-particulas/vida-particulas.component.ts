import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { VidaParticulas } from './vida-particulas';
@Component({
  selector: 'app-vida-particulas',
  template: `
  <article id="art_particulas">
    <h2>Partículas que parecen vivas</h2>
    <canvas id="canvas_particulas" (click)="pausar()"></canvas>
    <p id="descripcion_particulas" [innerHTML]="descripcion" ></p>
  </article>
  `,
  styleUrls: ['./vida-particulas.component.css']
})

export class VidaParticulasComponent implements AfterViewInit, OnDestroy {
  vidaParticulas?: VidaParticulas | null;

  constructor() { }

  ngAfterViewInit() {
    this.vidaParticulas = new VidaParticulas("canvas_particulas")
    this.vidaParticulas.ejecutar()
  }
  ngOnDestroy() {
    this.vidaParticulas!.composicion.animar = false
    delete this.vidaParticulas;
  }

  pausar() {
    this.vidaParticulas!.pausar()
  }

  descripcion: string = `Conjunto de partículas instruídas para relacionarse entre sí de modos distintos según su tipo `
    + `y el tipo de partícula a la que se enfrentan.`
    + `<br\>`
    + `Dependiendo de cómo se configuren las interacciones entre partículas, pueden emerger espontáneamente comportamientos que hagan que grupos de partículas parezcan organismos vivos.`
    + `<br\>`
    + `<br\>`
    + `Para este ejemplo:`
    + `<br\>`
    + `Las partículas rojas se rechazan entre sí y son atraídas por las blancas.`
    + `<br\>`
    + `Las partículas blancas se atraen entre sí y son repelidas por las rojas.`
    + `<br\>`
    + `<br\>`
    + `Hay varios factores que pueden influir: la magnitud de atracción y repulsión entre partículas, la distancia máxima de interacción,`
    + ` las condiciones límite (como la resolución del contacto entre partículas), el límite de la velocidad `
    + `y formas más complejas de abordar las interacciones al variar la distancia entre partículas.`
}
