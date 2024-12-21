import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Modèle de Livre (facultatif) 
export interface Livre { 
  id: number;
  titre: string; 
  auteur: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'http://localhost:3000/livres';

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les livres
  getLivres(): Observable<Livre[]> { 
    return this.http.get<Livre[]>(this.apiUrl)
    .pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des livres:', error);
        return throwError('Impossible de récupérer les données, veuillez réessayer plus tard.');
      })
    ); 
  }

  // // Méthode pour créer un nouveau livre
  // createLivre(livre: Livre): Observable<Livre> {
  //   return this.http.post(this.apiUrl, livre);
  // }

  // // Méthode pour obtenir un livre par ID
  // getLivreById(id: number): Observable<Livre> {
  //   return this.http.get<Livre>(`${this.apiUrl}/${id}`);
  // }

  // // Méthode pour mettre à jour un livre
  // updateLivre(id: number, livre: Livre): Observable<Livre> {
  //   return this.http.put(`${this.apiUrl}/${id}`, livre);
  // }

  // // Méthode pour supprimer un livre
  // deleteLivre(id: number): Observable<Livre> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}

