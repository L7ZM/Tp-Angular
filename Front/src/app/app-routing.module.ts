import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PretComponent } from './pret/pret.component';
import { AbonneComponent } from './abonne/abonne.component';
import { LivreComponent } from './livre/livre.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'livre',
    component: LivreComponent
  },
  {
    path: 'abonne',
    component: AbonneComponent
  },
  {
    path: 'pret',
    component: PretComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
