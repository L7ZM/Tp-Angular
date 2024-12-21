import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Abonne { 
  id?: number;
  nom: string; 
  prenom: string;
  adresse: string
}
export type creAbonne = Pick<Abonne, "nom" | "prenom" | "adresse">;

@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private apiUrl = 'http://localhost:3000/abones';

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les abonnes
  getAbonnes(): Observable<Abonne[]> { 
    return this.http.get<Abonne[]>(this.apiUrl)
    .pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des abonnes:', error);
        return throwError('Impossible de récupérer les données, veuillez réessayer plus tard.');
      })
    ); 
  }

  // Méthode pour créer un nouvel abonné
  createAbonne(abonne: Abonne): Observable<Abonne> { 
    return this.http.post<Abonne>(this.apiUrl, abonne)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création de l’abonné:', error);
          return throwError(() => new Error('Impossible de créer l’abonné, veuillez réessayer plus tard.'));
        })
      );
  }
}
