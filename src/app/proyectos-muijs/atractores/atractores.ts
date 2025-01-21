import { Composicion, Cuerpo, OpcionesGraficasForma, Punto, Forma, Vector, Fuerza } from "muijs-cuerpos";

export class Atractores {

    composicion!: Composicion;
    constructor(idCanvas: string) {
        this.composicion =
            Composicion.crearConIdDelCanvas(
                idCanvas
            );
    }
    private activo: boolean = false;

    anchoCanvas: number = 720
    altoCanvas: number = 720
    colorCanvas: string = ''
    private atractores: Cuerpo[] = [];
    private cuerposAtraidos: Cuerpo[] = [];
    cuerposAtraidosOpciones: opcionesCuerpo = {
        numero: 200,
        radio: 20,
        radioOrigen: 70,
    }
    cuerposAtractoresOpciones: opcionesCuerpo = {
        numero: 3,
        radio: 20,
        radioOrigen: 150,
    }
    magnitudAtraccion: number = 1
    velRotacionAtractores: number = 0.05;

    estiloAtraidos: OpcionesGraficasForma = {
        grosorTrazo: 1,
        rellenada: false,
        colorTrazo: 'lightblue',
    }
    private estiloAtractores: OpcionesGraficasForma = {
        rellenada: true,
        trazada: false,
        colorRelleno: 'darkred'
    }

    pausar() {
        this.composicion.animar = !this.composicion.animar
    }

    ejecutar(): void {
        if (!this.activo) {
            this.dibujar()
        }
        this.activo = true;
    }

    private dibujar(): void {
        this.composicion.tamanoCanvas(
            this.anchoCanvas,
            this.altoCanvas
        );

        this.composicion.colorCanvas = this.colorCanvas;

        // Iniciar cuerpos
        this.cuerposAtraidos = this.crearCuerpos(
            this.cuerposAtraidosOpciones,
            {
                x: this.composicion.dibujante.centroCanvas.x,
                y: this.composicion.dibujante.centroCanvas.y
            },
            this.estiloAtraidos
        );

        this.atractores = this.crearCuerpos(
            this.cuerposAtractoresOpciones,
            {
                x: this.composicion.dibujante.centroCanvas.x + 10,
                y: this.composicion.dibujante.centroCanvas.y
            },
            this.estiloAtractores
        );

        // Componer
        this.composicion.agregarCuerpos(
            ...this.atractores,
            ...this.cuerposAtraidos
        )
        this.composicion.dibujarCuerpos()
        this.composicion.animacion(
            () => this.calcularEstados(),
            () => this.dibujarFrame()
        )

        // ManejadorEventos.eventoMouseEnCanvas("click", this.composicion.dibujante.canvas, (evento) => {
        //   const cuerpoPillado: Cuerpo | undefined = this.atractores.find(cuerpo =>
        //     cuerpo.radio >= Geometria.distanciaEntrePuntos({
        //       x: evento.offsetX,
        //       y: evento.offsetY
        //     },
        //       cuerpo.posicion
        //     )
        //   )
        //   if (cuerpoPillado) {
        //     console.log('pillao')
        //     this.atractores.splice(
        //       this.atractores.findIndex(cuerpo => cuerpo == cuerpoPillado),
        //       1
        //     )
        //     this.composicion.cuerpos.splice(
        //       this.composicion.cuerpos.findIndex(cuerpo => cuerpo == cuerpoPillado),
        //       1
        //     )
        //   }
        //   else {
        //     const cuerpo: Cuerpo = this.crearCuerpo(
        //       evento.offsetX,
        //       evento.offsetY,
        //       this.cuerposAtractoresOpciones.radio,
        //       this.estiloAtractores
        //     )
        //     this.atractores.push(cuerpo)
        //     this.composicion.cuerpos = [...this.atractores, ...this.cuerposAtraidos]
        //   }
        // })
    }

    private crearCuerpos(
        opciones: opcionesCuerpo,
        centroOrigen: Punto,
        opcionesGraficas: OpcionesGraficasForma
    ): Cuerpo[] {
        const FormaOrigenCuerpos: Forma = Forma.poligono(
            centroOrigen.x,
            centroOrigen.y,
            opciones.numero,
            opciones.radioOrigen
        )
        const Cuerpos: Cuerpo[] = []
        FormaOrigenCuerpos.verticesTransformados.forEach((vertice: Vector) => {
            const cuerpo: Cuerpo = Cuerpo.circunferencia(
                vertice.x,
                vertice.y,
                opciones.radio
            )
            cuerpo.estiloGrafico = opcionesGraficas
            Cuerpos.push(cuerpo)
        })
        return Cuerpos;
    }

    private crearCuerpo(
        x: number,
        y: number,
        radio: number,
        opcionesGraficas: OpcionesGraficasForma
    ): Cuerpo {
        const cuerpo: Cuerpo = Cuerpo.circunferencia(
            x,
            y,
            radio
        );
        cuerpo.estiloGrafico = opcionesGraficas
        return cuerpo
    }

    private atraer(
        atractores: Cuerpo[],
        atraidos: Cuerpo[],
        magnitudAtraccion: number
    ): void {
        atraidos.forEach((cuerpo: Cuerpo) => {
            cuerpo.aceleracion = Vector.cero()
            atractores.forEach((atractor: Cuerpo) => {
                cuerpo.aceleracion =
                    cuerpo.aceleracion.sumar(
                        Fuerza.atraer(
                            cuerpo,
                            atractor,
                            magnitudAtraccion
                        )
                    )
            })
        })
    }
    private dibujarFrame() {
        this.composicion.dibujante.limpiarCanvas()
        this.composicion.dibujarCuerpos()
    }

    private calcularEstados() {
        this.atractores.forEach(
            (atractor: Cuerpo) => atractor.rotarSegunPunto(
                this.composicion.dibujante.centroCanvas,
                this.velRotacionAtractores
            )
        )
        this.atraer(
            this.atractores,
            this.cuerposAtraidos,
            this.magnitudAtraccion
        )
        this.composicion.moverCuerpos()
    }
}

type opcionesCuerpo = {
    numero: number,
    radio: number,
    radioOrigen: number,
}
