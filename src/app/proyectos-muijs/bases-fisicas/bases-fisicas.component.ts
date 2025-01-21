import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AtractorRebote } from './bases-fisicas';
@Component({
  selector: 'app-bases-fisicas',
  imports: [],
  template: `
  <article id="art_rebote">
    <h2>Partículas atraídas y rebotadas</h2>
    <canvas id="canvas_rebote" (click)="pausar()" ></canvas>
    <p id="descripcion_rebote"  [innerHTML]="descripcion"></p>
  </article>
  `,
  styleUrl: './bases-fisicas.component.css'
})
export class BasesFisicasComponent implements AfterViewInit, OnDestroy {
  atractorRebote?: AtractorRebote;

  constructor() { }

  ngAfterViewInit() {
    this.atractorRebote = new AtractorRebote("canvas_rebote")
    this.atractorRebote.ejecutar()
  }
  ngOnDestroy() {
    this.atractorRebote!.composicion.animar = false
    delete this.atractorRebote;
  }

  pausar() {
    this.atractorRebote!.pausar()
  }

  descripcion: string = `Demostración de atracción y resolución de colisiones entre cuerpos. `
    + `<br\>`
    + `<br\>`
    + `El cuerpo más grande tiene una masa considerablemente mayor a todos los demás y ejerce una atracción gravitacional sobre los otros cuerpos.`
    + `<br\>`
    + `Cuando dos cuerpos colisionan entre sí, se mantiene la energía del conjunto, transfiriendo y modificando sus velocidades entre sí.`
    + `<br\>`
    + `<br\>`
    + `Al hacer click sobre la imagen se puede mostrar u ocultar el trazado del Quad Tree, que es un algoritmo para simplificar el número de cálculos que se realiza`
    + ` entre cada actualización del estado del sistema. `
    + `Lo que hace el Quad Tree es dividir el espacio en cuadrantes y repartir los cuerpos en cada cuadrante, así la verificación que se debe hacer constantemente para ver si dos cuerpos están o no en contacto, se puede hacer`
    + ` por cuadrante y no entre todos los cuerpos a la vez. `
    + `<br\>`
    + `Por ejemplo, si un cuerpo está en el cuadrante superior izquierdo, solo se comprobará si colisiona o no con los demás cuerpos en ese cuadrante, y no con la totalidad de cuerpos.`
}
