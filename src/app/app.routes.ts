import { Routes } from '@angular/router';
import { AtractoresComponent } from './proyectos-muijs/atractores/atractores.component';
import { BasesFisicasComponent } from './proyectos-muijs/bases-fisicas/bases-fisicas.component';
import { ProyectosMuijsComponent } from './proyectos-muijs/proyectos-muijs.component';
import { VidaParticulasComponent } from './proyectos-muijs/vida-particulas/vida-particulas.component';


export const routes: Routes = [
    {
        path: ``, // Ruta vacía para que sea el home
        component: ProyectosMuijsComponent,
        title: `MUI.JS`
    },
    {
        path: `atractores`, // Ruta vacía para que sea el home
        component: AtractoresComponent,
        title: `MUI.JS - Atractores`
    },
    {
        path: `vidaparticulas`, // Ruta vacía para que sea el home
        component: VidaParticulasComponent,
        title: `MUI.JS - Partículas vivas`
    },
    {
        path: `atractorrebote`, // Ruta vacía para que sea el home
        component: BasesFisicasComponent,
        title: `MUI.JS - Gravedad y colisión`
    },
];
