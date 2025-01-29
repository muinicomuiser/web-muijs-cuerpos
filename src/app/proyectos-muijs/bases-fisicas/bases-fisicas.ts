import { Composicion, Cuerpo, Dibujante, Entorno, Forma, Fuerza, ManejadorEventos, Matematica, Restriccion } from "muijs-cuerpos";

export class AtractorRebote {
    composicion!: Composicion;
    private activo: boolean = false;

    anchoCanvas: number = 1080;
    altoCanvas: number = 720;
    colorCanvas: string = 'black'

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
        // this.composicion.animar = !this.composicion.animar
    }

    dibujar() {
        this.composicion.tamanoCanvas(
            this.anchoCanvas,
            this.altoCanvas
        );

        this.composicion.colorCanvas = this.colorCanvas;

        //CUERPOS
        //Formas generadoras
        const RADIOGENERADORA: number = Matematica.aleatorioEntero(220, 300);
        const RADIOGENERADORADOS: number = Matematica.aleatorioEntero(80, 200);
        const NUMEROCUERPOSFUERA: number = Matematica.aleatorioEntero(20, 80);
        const NUMEROCUERPOSCENTRO: number = Matematica.aleatorioEntero(20, 140) + (NUMEROCUERPOSFUERA == 0 ? 1 : 0)
        const FormaGeneradora: Forma = Forma.poligono(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, NUMEROCUERPOSFUERA, RADIOGENERADORA)
        const FormaGeneradoraDos: Forma = Forma.poligono(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, NUMEROCUERPOSCENTRO, RADIOGENERADORADOS)

        //Cuerpos
        const RADIOCUERPO: number = 12;
        const RADIOCUERPODOS: number = 6;
        const Circunferencias: Cuerpo[] = []

        FormaGeneradora.verticesTransformados.forEach((vertice) => {
            let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPO)
            circunferencia.estiloGrafico = { colorRelleno: 'brown', colorTrazo: 'black' }
            circunferencia.masa = 80
            Circunferencias.push(circunferencia);
        })

        FormaGeneradoraDos.verticesTransformados.forEach((vertice) => {
            let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPODOS)
            circunferencia.estiloGrafico = { colorRelleno: 'pink', colorTrazo: 'black' }
            circunferencia.masa = 10
            Circunferencias.push(circunferencia);
        })


        //cuerpo atractor
        const MagnitudAtraccion: number = 0.04;
        const RADIOATRACTOR: number = 40
        const Atractor: Cuerpo = Cuerpo.circunferencia(this.composicion.centroCanvas.x, this.composicion.centroCanvas.y, RADIOATRACTOR)
        Atractor.masa = 500000
        Atractor.estiloGrafico = { colorRelleno: 'orange', colorTrazo: 'black', rellenada: true }
        Atractor.fijo = false;


        //Se integran todos los cuerpos a la composición
        this.composicion.agregarCuerpos(...Circunferencias, Atractor);
        this.composicion.nivelesQuadTree = 6;
        this.composicion.trazarQuadTree = true;


        //Frontera del canvas
        const Frontera: Entorno = Entorno.crearEntornoCanvas(this.composicion.dibujante.canvas);
        // Frontera.cuerpo.estiloGrafico = { colorTrazo: 'white', grosorTrazo: 4 }
        this.composicion.usarfpsNativos = true;
        this.composicion.tick = 10
        this.composicion.animacion(
            () => {
                Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion))
                Frontera.colisionConBorde(...Circunferencias, Atractor);
                // COMPO.contactoSimpleCuerpos()
                this.composicion.moverCuerpos()
                this.composicion.reboteElasticoCuerpos()
                this.composicion.cuerpos.forEach((cuerpo: Cuerpo) => {
                    cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10)
                    cuerpo.velocidad = cuerpo.velocidad.escalar(0.999)
                })
            },
            () => {
                this.composicion.dibujante.limpiarCanvas(0.6)
                this.composicion.dibujante.trazar(Frontera.cuerpo);
                this.composicion.dibujarCuerpos();
            }
        )
        ManejadorEventos.eventoMouseEnCanvas('click', this.composicion.dibujante.canvas, () => this.composicion.trazarQuadTree = !this.composicion.trazarQuadTree);
    }
}

// export function atractorRebote(idCanvas: string) {



//GRABACIÓN
// let videoStream = Render.canvas.captureStream(60);
// let mediaRecorder = new MediaRecorder(videoStream);

// let chunks: BlobPart[] = [];
// mediaRecorder.ondataavailable = function (e) {
//     chunks.push(e.data);
// };

// mediaRecorder.onstop = function (e) {
//     let blob = new Blob(chunks, { 'type': 'video/mpeg' });
//     chunks = [];
//     let videoURL = URL.createObjectURL(blob);
//     // let link = document.createElement("a"); // Or maybe get it from the current document
//     let link: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("descarga"); // Or maybe get it from the current document
//     link.href = videoURL;
//     link.download = "Captura Canvas";
//     link.innerHTML = 'Descargar'
//     link.style.color = 'skyblue'
//     // link.click()
// };

// mediaRecorder.ondataavailable = function (e) {
//     chunks.push(e.data);
// };

// mediaRecorder.start();
// animar();
// setTimeout(function () { mediaRecorder.stop(); }, 30000);


//ANIMACIÓN
// function animar() {
//     Render.limpiarCanvas(0)

//     Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion))
//     Frontera.colisionConBorde(...Circunferencias, Atractor);
//     // COMPO.contactoSimpleCuerpos()

//     COMPO.cuerpos.forEach((cuerpo) => {
//         cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10)
//         cuerpo.velocidad = cuerpo.velocidad.escalar(0.999)
//     })
//     COMPO.moverCuerpos()
//     COMPO.reboteElasticoCuerpos()

//     Render.trazar(Frontera.cuerpo);
//     COMPO.dibujarCuerpos();
//     requestAnimationFrame(animar)
// }
// }



