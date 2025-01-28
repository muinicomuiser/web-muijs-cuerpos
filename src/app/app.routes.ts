import { Routes } from '@angular/router';
import { AtractoresComponent } from './proyectos-muijs/atractores/atractores.component';
import { BasesFisicasComponent } from './proyectos-muijs/bases-fisicas/bases-fisicas.component';
import { ProyectosMuijsComponent } from './proyectos-muijs/proyectos-muijs.component';
import { VidaParticulasComponent } from './proyectos-muijs/vida-particulas/vida-particulas.component';
import { HomeComponent } from './home/home.component';
import { ReboteContenedorComponent } from './proyectos-muijs/rebote-contenedor/rebote-contenedor.component';


export const routes: Routes = [
    {
        path: ``, // Ruta vacía para que sea el home
        component: HomeComponent,
        title: `MUI.JS`
    },
    {
        path: `ejemplos`,
        component: ProyectosMuijsComponent,
        title: `MUI.JS - Ejemplos`
    },
    {
        path: `ejemplos/atractores`, // Ruta vacía para que sea el home
        component: AtractoresComponent,
        title: `MUI.JS - Atractores`
    },
    {
        path: `ejemplos/vidaparticulas`, // Ruta vacía para que sea el home
        component: VidaParticulasComponent,
        title: `MUI.JS - Partículas vivas`
    },
    {
        path: `ejemplos/atractorrebote`, // Ruta vacía para que sea el home
        component: BasesFisicasComponent,
        title: `MUI.JS - Gravedad y colisión`
    },
    {
        path: `ejemplos/rebotecontenedor`, // Ruta vacía para que sea el home
        component: ReboteContenedorComponent,
        title: `MUI.JS - Rebote y contenedor`
    },
];
