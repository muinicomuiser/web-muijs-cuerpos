import { Composicion, Dibujante, Contenedor, Cuerpo, Forma, Entorno, Fuerza } from "muijs-cuerpos";

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
        const RADIOCONTENEDOR: number = 150;
        const contenedor: Contenedor = Contenedor.crearContenedor(Cuerpo.circunferencia(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, RADIOCONTENEDOR));
        contenedor.cuerpo.estiloGrafico = {
            colorTrazo: 'white'
        }
        //Cuerpos
        const NUMEROCUERPOS: number = 20;
        const RADIOCUERPOS: number = 8;
        const cuerpos: Cuerpo[] = [];
        const formaGeneradora: Forma = Forma.poligono(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, NUMEROCUERPOS, 100)
        formaGeneradora.verticesTransformados.forEach((vertice) => {
            cuerpos.push(Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPOS))
        })
        cuerpos.forEach((cuerpo) => cuerpo.colorTrazo = 'white')
        this.composicion.agregarCuerpos(...cuerpos)
        contenedor.agregarCuerposContenidos(...cuerpos)

        //Entorno
        const entorno: Entorno = Entorno.crearEntornoCanvas(this.composicion.dibujante.canvas);
        entorno.agregarCuerposContenidos(contenedor.cuerpo);

        //Gravedad
        const atractorGravedad: Cuerpo = Cuerpo.circunferencia(this.composicion.centroCanvas.x, 50, 20);
        atractorGravedad.colorTrazo = 'white'
        contenedor.cuerpo.fijo = false
        this.composicion.animacion(
            () => {
                cuerpos.forEach((cuerpo) => {
                    cuerpo.aceleracion = Fuerza.atraer(cuerpo, atractorGravedad, 0.0005)
                    cuerpo.velocidad = cuerpo.velocidad.escalar(0.99)
                    contenedor.cuerpo.aceleracion = Fuerza.atraer(contenedor.cuerpo, atractorGravedad, 0.1)
                    contenedor.cuerpo.velocidad = contenedor.cuerpo.velocidad.escalar(0.99)
                    // contenedor.mover()
                    // entorno.rebotarCircunferenciasConBorde()
                    atractorGravedad.rotarSegunPunto(this.composicion.dibujante.centroCanvas, 0.002)
                    // entorno.cuerpo.rotar(0.01)
                    this.composicion.reboteElasticoCuerpos()
                    contenedor.rebotarCircunferenciasConBorde()
                    this.composicion.moverCuerpos()
                })
            },
            () => {
                this.composicion.dibujante.limpiarCanvas(0.8)
                this.composicion.dibujante.trazar(atractorGravedad)
                this.composicion.dibujante.trazar(contenedor.cuerpo)
                this.composicion.dibujante.trazar(entorno.cuerpo)
                this.composicion.dibujarCuerpos();
            }
        )
    }
}


