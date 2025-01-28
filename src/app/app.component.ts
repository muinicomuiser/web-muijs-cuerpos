import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent],
  template: `
    <header>
      <app-navbar></app-navbar>
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
