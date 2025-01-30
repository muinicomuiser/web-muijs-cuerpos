import { Composicion, Dibujante, Contenedor, Cuerpo, Forma, Entorno, Fuerza, Matematica, Vector } from "muijs-cuerpos";

export class ReboteContenedor {
    composicion!: Composicion;
    private activo: boolean = false;

    anchoCanvas: number = 720;
    altoCanvas: number = 720;

    colorCanvas: string = Dibujante.colorHSL(250, 50, 0)

    constructor(idCanvas: string) {
        this.composicion =
            Composicion.crearConIdDelCanvas(
                idCanvas
            );
    }

    ejecutar() {
        if (!this.activo) {
            this.dibujar()
        }
        this.activo = true;
    }

    pausar() {
        this.composicion.animar = !this.composicion.animar
    }

    dibujar() {
        this.composicion.tamanoCanvas(
            this.anchoCanvas,
            this.altoCanvas
        );
        this.composicion.colorCanvas = this.colorCanvas;

        //Contenedor
        const RADIOCONTENEDOR: number = 380;
        const contenedor: Contenedor = Contenedor.crearContenedor(Cuerpo.rectangulo(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, RADIOCONTENEDOR, RADIOCONTENEDOR));
        contenedor.cuerpo.estiloGrafico = {
            colorTrazo: 'white',
            colorRelleno: 'white'
        }
        //Cuerpos
        const cuerpoInterior: Cuerpo = Cuerpo.circunferencia(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, RADIOCONTENEDOR / 3)
        cuerpoInterior.fijo = true;
        cuerpoInterior.estiloGrafico = {
            rellenada: false,
            colorTrazo: 'white'
        }
        const NUMEROCUERPOS: number = 60;
        const RADIOCUERPOS: number = 10;
        const cuerpos: Cuerpo[] = [];
        const formaGeneradora: Forma = Forma.poligono(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, NUMEROCUERPOS, 150)
        formaGeneradora.verticesTransformados.forEach((vertice) => {
            let cuerpoCreado: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPOS);
            cuerpoCreado.estiloGrafico = {
                colorRelleno: Dibujante.colorHSL(Matematica.aleatorioEntero(0, 360), 100, 50),
                colorTrazo: 'white',
                trazada: false
            }
            cuerpos.push(cuerpoCreado)
        })
        this.composicion.agregarCuerpos(...cuerpos, cuerpoInterior)
        contenedor.agregarCuerposContenidos(...cuerpos)

        //Entorno
        const entorno: Entorno = Entorno.crearEntornoCanvas(this.composicion.dibujante.canvas);
        entorno.agregarCuerposContenidos(contenedor.cuerpo);

        //Gravedad
        const atractorGravedad: Cuerpo = Cuerpo.circunferencia(this.composicion.centroCanvas.x, 50, 10);
        atractorGravedad.estiloGrafico = {
            colorRelleno: 'white',
            rellenada: true,
            trazada: false
        }
        // this.composicion.trazarQuadTree = true
        contenedor.cuerpo.fijo = true;
        this.composicion.nivelesQuadTree = 4;
        this.composicion.tick = 50;
        this.composicion.animacion(
            () => {
                cuerpos.forEach((cuerpo) => {
                    cuerpo.aceleracion = Vector.cero();
                    cuerpo.aceleracion = Fuerza.atraer(cuerpo, atractorGravedad, 0.8)
                    cuerpo.velocidad = cuerpo.velocidad.escalar(0.9)
                    // contenedor.cuerpo.aceleracion = Fuerza.atraer(contenedor.cuerpo, atractorGravedad, 0.1)
                    // contenedor.cuerpo.velocidad = contenedor.cuerpo.velocidad.escalar(0.99)
                    // contenedor.mover()
                    // entorno.rebotarCircunferenciasConBorde()
                    // entorno.cuerpo.rotar(0.01)
                })
                this.composicion.moverCuerpos()
                this.composicion.reboteElasticoCuerpos()
                this.composicion.reboteElasticoCuerpos()
                this.composicion.reboteElasticoCuerpos()
                this.composicion.reboteElasticoCuerpos()
                contenedor.rebotarCircunferenciasConBorde()
                contenedor.rebotarCircunferenciasConBorde()
                atractorGravedad.rotarSegunPunto(this.composicion.centroCanvas, 0.03)
            },
            () => {
                this.composicion.dibujante.limpiarCanvas(0.9)
                this.composicion.dibujante.dibujar(atractorGravedad)
                this.composicion.dibujante.trazar(contenedor.cuerpo)
                // this.composicion.dibujante.trazar(entorno.cuerpo)
                this.composicion.dibujarCuerpos();
            }
        )
    }
}


