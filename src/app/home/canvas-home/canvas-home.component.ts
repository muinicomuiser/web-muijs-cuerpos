import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Composicion, Cuerpo } from 'muijs-cuerpos';
import { HomeCanvasBoids } from './canvas-home-boids.ts';

@Component({
  selector: 'app-canvas-home',
  imports: [],
  templateUrl: './canvas-home.component.html',
  styleUrls: ['../home.component.css', './canvas-home.component.css']
})
export class CanvasHomeComponent implements AfterViewInit, OnDestroy {

  composicion?: Composicion;
  boids?: HomeCanvasBoids;
  ngAfterViewInit() {
    this.boids = new HomeCanvasBoids()
    this.boids.dibujar('canvas_home')
    // this.dibujar()
  }
  ngOnDestroy() {
    this.boids?.composicion?.cancelarAnimacion()
    // this.composicion?.cancelarAnimacion()
  }
  dibujar() {
    this.composicion = Composicion.crearConIdDelCanvas('canvas_home')
    this.composicion.tamanoCanvas(
      window.visualViewport?.width! - window.visualViewport?.offsetLeft!,
      window.visualViewport?.height! - window.visualViewport?.offsetTop!,
    );
    const cuadrado: Cuerpo = Cuerpo.rectangulo(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, 800, 800)
    cuadrado.estiloGrafico = {
      rellenada: false,
      colorTrazo: 'white'
    }
    this.composicion.colorCanvas = 'black'
    this.composicion.agregarCuerpos(cuadrado)
    this.composicion.animacion(
      () => {
        cuadrado.rotar(0.1)
      },
      () => {
        this.composicion?.dibujante.limpiarCanvas(0.1)
        this.composicion?.dibujarCuerpos()
      }
    )
  }



}
