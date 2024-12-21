import { Routes } from '@angular/router';
import { LivreComponent } from './livre/livre.component';
import { AbonneComponent } from './abonne/abonne.component';
import { PretComponent } from './pret/pret.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
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
