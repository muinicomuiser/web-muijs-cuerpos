import { Composicion, Dibujante, Contenedor, Cuerpo, Forma, Entorno, Fuerza, Matematica } from "muijs-cuerpos";

export class ReboteContenedor {
    composicion!: Composicion;
    private activo: boolean = false;

    anchoCanvas: number = 1080;
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
        const RADIOCONTENEDOR: number = 180;
        const contenedor: Contenedor = Contenedor.crearContenedor(Cuerpo.circunferencia(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, RADIOCONTENEDOR));
        contenedor.cuerpo.estiloGrafico = {
            colorTrazo: 'white',
            colorRelleno: 'white'
        }
        //Cuerpos
        const NUMEROCUERPOS: number = 30;
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
        this.composicion.agregarCuerpos(...cuerpos)
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
        contenedor.cuerpo.fijo = false
        this.composicion.animacion(
            () => {
                cuerpos.forEach((cuerpo) => {
                    cuerpo.aceleracion = Fuerza.atraer(cuerpo, atractorGravedad, 0.001)
                    cuerpo.velocidad = cuerpo.velocidad.escalar(0.93)
                    // contenedor.cuerpo.aceleracion = Fuerza.atraer(contenedor.cuerpo, atractorGravedad, 0.1)
                    // contenedor.cuerpo.velocidad = contenedor.cuerpo.velocidad.escalar(0.99)
                    // contenedor.mover()
                    // entorno.rebotarCircunferenciasConBorde()
                    atractorGravedad.rotarSegunPunto(this.composicion.dibujante.centroCanvas, 0.001)
                    // entorno.cuerpo.rotar(0.01)
                    this.composicion.reboteElasticoCuerpos()
                    contenedor.rebotarCircunferenciasConBorde()
                    this.composicion.moverCuerpos()
                })
            },
            () => {
                this.composicion.dibujante.limpiarCanvas(0.9)
                this.composicion.dibujante.dibujar(atractorGravedad)
                this.composicion.dibujante.trazar(contenedor.cuerpo)
                this.composicion.dibujante.trazar(entorno.cuerpo)
                this.composicion.dibujarCuerpos();
            }
        )
    }
}


