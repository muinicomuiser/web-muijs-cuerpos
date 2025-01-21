import { Composicion, Cuerpo, Dibujante, Entorno, Fuerza, Geometria, Matematica, OpcionesGraficasForma, Punto, QuadTree, Vector } from "muijs-cuerpos";

export class VidaParticulas {
    composicion!: Composicion;
    private activo: boolean = false;

    anchoCanvas: number = 1080;
    altoCanvas: number = 720;
    colorCanvas: string = Dibujante.colorHSL(250, 50, 0)


    // Partículas
    idParticula: number = 1;

    // Particulas Uno
    private particulasUno: Cuerpo[] = []
    particulasUnoOpciones: opcionesParticula = {
        radio: 3,
        numero: 350,
    }
    particulasUnoEstilo: OpcionesGraficasForma = {
        trazada: false,
        colorRelleno: Dibujante.colorHSL(0, 100, 50),
    }

    // Particulas Dos
    particulasDos: Cuerpo[] = []
    particulasDosOpciones: opcionesParticula = {
        radio: 3,
        numero: 600,
    }
    particulasDosEstilo: OpcionesGraficasForma = {
        trazada: false,
        colorRelleno: Dibujante.colorHSL(45, 90, 90),
    }

    // Interacciones
    UnoUno: number = - (10) * (0.01);
    UnoDos: number = (4) * (0.01);
    DosDos: number = (2) * (0.01);
    DosUno: number = - (6) * (0.01);

    //FUNCIONES INTERACCIONES
    DISTANCIA_INTERACCION: number = 150;
    DISTANCIA_REPELER: number = 8;
    MAGNITUD_REPELER: number = 0.5;
    MAGNITUD_VELOCIDAD_MAXIMA: number = 1;

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

    private dibujar() {
        // Iniciar composición

        this.composicion.tamanoCanvas(
            this.anchoCanvas,
            this.altoCanvas
        );

        this.composicion.colorCanvas = this.colorCanvas
        const ENTORNO: Entorno = Entorno.crearEntornoCanvas(this.composicion.dibujante.canvas)


        //PARTICULAS ROJAS
        this.particulasUno = this.crearParticulas(
            this.particulasUnoOpciones,
            this.particulasUnoEstilo
        )
        //PARTICULAS AMARILLAS    
        this.particulasDos = this.crearParticulas(
            this.particulasDosOpciones,
            this.particulasDosEstilo
        )

        //INTEGRACIÓN DE CUERPOS A COMPOSICIÓN
        this.composicion.agregarCuerpos(...this.particulasUno, ...this.particulasDos)
        this.composicion.entorno = ENTORNO;
        this.composicion.entorno.agregarCuerposContenidos(...this.particulasUno, ...this.particulasDos)

        //NUEVO CUADRO
        this.composicion.tick = 10;
        this.composicion.fps = 3;
        this.composicion.usarfpsNativos = true;

        //GRABAR
        // Grabador.grabarCanvas(Dibu.canvas, 120000, 20, 'descarga')
        //ANIMAR
        this.composicion.animacion(() => {
            let Quad: QuadTree = new QuadTree(0, 0, this.composicion.anchoCanvas, this.composicion.altoCanvas, 10, 5);
            this.composicion.cuerpos.forEach(cuerpo => Quad.insertarPunto(cuerpo.posicion, cuerpo));
            this.composicion.cuerpos.forEach(cuerpo => {
                cuerpo.aceleracion = Vector.cero()
                cuerpo.velocidad = cuerpo.velocidad.sumar(Vector.crear(Matematica.aleatorio(-0.1, 0.1), Matematica.aleatorio(-0.1, 0.1)))
                let puntosEnRango: Punto[] = Quad.puntosEnRango(cuerpo.posicion.x - this.DISTANCIA_INTERACCION, cuerpo.posicion.x + this.DISTANCIA_INTERACCION, cuerpo.posicion.y - this.DISTANCIA_INTERACCION, cuerpo.posicion.y + this.DISTANCIA_INTERACCION);
                for (let punto of puntosEnRango) {
                    if (punto.contenido instanceof Cuerpo) {
                        this.interaccionEnRango(cuerpo, punto.contenido)
                    }
                }
            })
            Quad.contactoSimpleCuerpos()
            this.composicion.moverCuerpos()
            this.composicion.entorno.rebotarCircunferenciasConBorde()
            // this.composicion.bordesEntornoInfinitos(COMPO.entorno)
            this.composicion.cuerpos.forEach(cuerpo => cuerpo.velocidad = cuerpo.velocidad.escalar(0.9))
            Quad.contactoSimpleCuerpos()

        }, () => {
            this.composicion.dibujante.limpiarCanvas();
            this.composicion.dibujarCuerpos();
        })
    }

    //EJECUCIÓN DE INTERACCIONES
    private interaccionEnRango(particula: Cuerpo, otraParticula: Cuerpo): void {
        let interaccionEspecifica: number;
        let distanciaEntreParticulas: number = Geometria.distanciaEntrePuntos(particula.posicion, otraParticula.posicion)
        if (particula.id != otraParticula.id && distanciaEntreParticulas < this.DISTANCIA_INTERACCION) {
            interaccionEspecifica = this.determinarInteraccion(particula, otraParticula)
            if (distanciaEntreParticulas < this.DISTANCIA_REPELER) {
                let repulsion: number = this.MAGNITUD_REPELER * ((this.DISTANCIA_REPELER - distanciaEntreParticulas) / this.DISTANCIA_REPELER)
                let aceleracionCercana: Vector = Fuerza.repeler(particula, otraParticula, repulsion)
                particula.aceleracion = particula.aceleracion.sumar(aceleracionCercana)
            }
            else {
                let magnitudInteraccion: number;
                if (distanciaEntreParticulas < ((this.DISTANCIA_INTERACCION - this.DISTANCIA_REPELER) / 2 + this.DISTANCIA_REPELER)) {
                    magnitudInteraccion = interaccionEspecifica * (distanciaEntreParticulas - this.DISTANCIA_REPELER) / (this.DISTANCIA_INTERACCION - this.DISTANCIA_REPELER)
                }
                else {
                    magnitudInteraccion = interaccionEspecifica * (1 - (distanciaEntreParticulas - this.DISTANCIA_REPELER) / (this.DISTANCIA_INTERACCION - this.DISTANCIA_REPELER))
                }
                let aceleracion: Vector = Fuerza.atraer(particula, otraParticula, magnitudInteraccion);
                particula.aceleracion = particula.aceleracion.sumar(aceleracion)
            }
        }
    }

    private determinarInteraccion(particula: Cuerpo, otraParticula: Cuerpo): number {
        if (particula.colorRelleno == this.particulasUnoEstilo.colorRelleno && otraParticula.colorRelleno == this.particulasUnoEstilo.colorRelleno) {
            return this.UnoUno;
        }
        else if (particula.colorRelleno == this.particulasDosEstilo.colorRelleno && otraParticula.colorRelleno == this.particulasDosEstilo.colorRelleno) {
            return this.DosDos;
        }
        else if (particula.colorRelleno == this.particulasUnoEstilo.colorRelleno && otraParticula.colorRelleno == this.particulasDosEstilo.colorRelleno) {
            return this.UnoDos;
        }
        else {
            return this.DosUno;
        }
    }

    private crearParticulas(
        opciones: opcionesParticula,
        opcionesGraficas: OpcionesGraficasForma
    ): Cuerpo[] {
        const particulas: Cuerpo[] = []
        for (let i: number = 0; i < opciones.numero; i++) {
            const AleatorioX: number = Matematica.aleatorioEntero(1, this.composicion.anchoCanvas)
            const AleatorioY: number = Matematica.aleatorioEntero(1, this.composicion.altoCanvas)
            const particula: Cuerpo = Cuerpo.circunferencia(AleatorioX, AleatorioY, opciones.radio);
            particula.estiloGrafico = opcionesGraficas
            particula.id = this.idParticula;
            particulas.push(particula);
            this.idParticula++;
        }
        return particulas;
    }
}


type opcionesParticula = {
    numero: number,
    radio: number,
}