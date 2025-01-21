import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <header>
      <h1><a [routerLink]="['/']">MUI.JS - CUERPOS</a></h1>
    </header>
  <body>
    <main>
      <section id="seccion">
        <router-outlet></router-outlet>
      </section>
    </main>
  </body>
  `,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mui.js - Cuerpos';

}
