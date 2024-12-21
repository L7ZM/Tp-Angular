import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Pret { 
  id: number;
  date_pret: Date;
  date_retour: Date;
  id_livre: number; 
  id_abonne: number;
}

export type crePret = Partial<Pick<Pret, "date_pret" | "date_retour" | "id_livre" | "id_abonne">>;

@Injectable({
  providedIn: 'root'
})
export class PretsService {
  private apiUrl = 'http://localhost:3000/prets';
  
  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les prets
  getPrets(): Observable<Pret[]> { 
    return this.http.get<Pret[]>(this.apiUrl)
    .pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des prets:', error);
        return throwError('Impossible de récupérer les données, veuillez réessayer plus tard.');
      })
    ); 
  }

  // Méthode pour associer un livre à un abonnée
  createPret(crepret: crePret): Observable<crePret> { 
    return this.http.post<crePret>(this.apiUrl, crepret)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création du pret:', error);
          return throwError(() => new Error('Impossible d\'associer ce livre à cet abonnée, veuillez réessayer plus tard.'));
        })
      );
  }

}
