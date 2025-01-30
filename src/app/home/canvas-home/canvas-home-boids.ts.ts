import { Composicion, Cuerpo, Dibujante, Entorno, Forma, Fuerza, Geometria, ManejadorEventos, Matematica, Restriccion, Vector } from "muijs-cuerpos";


export class HomeCanvasBoids {
    composicion?: Composicion;
    dibujar(idCanvas: string) {
        this.composicion = Composicion.crearConIdDelCanvas(idCanvas)
        // this.composicion.tamanoCanvas(
        //     window.visualViewport?.width! - window.visualViewport?.offsetLeft!,
        //     window.visualViewport?.height! - window.visualViewport?.offsetTop!,
        // );
        this.composicion.colorCanvas = Dibujante.colorHSL(220, 100, 0);
        this.composicion.anchoCanvas = window.innerWidth;
        this.composicion.altoCanvas = window.innerHeight;

        const BORDEMENOR: number = this.composicion.anchoCanvas < this.composicion.altoCanvas ? this.composicion.anchoCanvas : this.composicion.altoCanvas

        //CONSTANTES
        const NUMEROBOIDS: number = 200 < Math.floor(BORDEMENOR / 2) ? 200 : Math.floor(BORDEMENOR / 2);
        const ESCALA: number = 3;
        const VELMAXIMA: number = 2;
        const RADIOINICIAL: number = BORDEMENOR / 2.5;

        const DISTANCIAREPELER: number = 30;
        const FUERZAREPELER: number = 6;

        const DISTANCIACOORDINAR: number = 50;
        const FACTORCOORDINACION: number = 0.4;

        const COLORBOID: string = Dibujante.colorHSL(220, 0, 100);

        const DETECTARMOUSE: boolean = true;
        const ATRACCIONMOUSE: number = 5;

        ////////////////

        let mousePresente: boolean = false;
        let vectorMouse: Vector = Vector.cero();

        let entorno: Entorno = Entorno.crearEntornoCanvas(this.composicion.canvas)

        /**Forma generadora de posiciones.*/
        let formaGeneradora: Forma = Forma.poligono(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, NUMEROBOIDS, RADIOINICIAL);

        /**Generador de círculos.*/
        let boids: Cuerpo[] = [];
        let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
        formaGeneradora.verticesTransformados.forEach((vertice) => {
            let boid: Cuerpo = Cuerpo.poligono(vertice.x, vertice.y, 3, 5);
            boid.vertices = verticesboids;
            boid.posicion = vertice;
            boid.velocidad = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
            boid.escala = ESCALA
            boid.rotarSegunVelocidad = true;
            boid.colorTrazo = COLORBOID;
            boids.push(boid);
        })

        // animar();

        this.composicion.animacion(
            () => {
                boids.forEach((boid) => {
                    // boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
                    boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
                    boid.posicion = entorno.envolverBorde(boid.posicion);
                    boid.mover()
                    // boid.trazar(this.composicion?.dibujante!);
                    boid.aceleracion = Vector.cero()
                })
                for (let i: number = 0; i < boids.length - 1; i++) {
                    for (let j: number = i + 1; j < boids.length; j++) {
                        let distancia: number = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                        if (distancia < DISTANCIACOORDINAR) {
                            if (distancia < DISTANCIAREPELER) {
                                boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia))
                                boids[j].aceleracion = boids[i].aceleracion.invertir()
                            }
                            let velI: Vector = boids[i].velocidad;
                            boids[i].velocidad = boids[i].velocidad.sumar(boids[j].velocidad.escalar(FACTORCOORDINACION * (1 / distancia)))
                            boids[j].velocidad = boids[j].velocidad.sumar(velI.escalar(FACTORCOORDINACION * (1 / distancia)))
                        }

                    }
                }
                if (DETECTARMOUSE && mousePresente) {
                    boids.forEach((boid) => {
                        let distanciaMouse: number = Geometria.distanciaEntrePuntos(boid.posicion, vectorMouse);
                        boid.aceleracion = boid.aceleracion.sumar(Fuerza.atraerAVector(boid, vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));

                    })
                }

            },
            () => {
                this.composicion?.dibujante.limpiarCanvas()
                boids.forEach((boid) => {
                    // boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
                    // boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
                    // boid.posicion = entorno.envolverBorde(boid.posicion);
                    // boid.mover()
                    boid.trazar(this.composicion?.dibujante!);
                    // boid.aceleracion = Vector.cero()
                })

            }
        )
        function setMousePresente(presente: boolean): void {
            if (DETECTARMOUSE) {
                mousePresente = presente;
            }
        }

        ManejadorEventos.mouseEnCanvas('mouseenter', this.composicion.canvas, setMousePresente, true);
        ManejadorEventos.mouseEnCanvas('mouseleave', this.composicion.canvas, setMousePresente, false);
        ManejadorEventos.eventoMouseEnCanvas('mousemove', this.composicion.canvas, (evento) => {
            if (DETECTARMOUSE) {
                let mouseX: number = evento.pageX - this.composicion?.canvas.offsetLeft!;
                let mouseY: number = evento.pageY - this.composicion?.canvas.offsetTop!
                vectorMouse = Vector.crear(mouseX, mouseY);
            }
        });

        // function animar() {
        //     /**Dibujar boids.*/


        //     requestAnimationFrame(animar);
        // }



    }
}


