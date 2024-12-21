import { Component, OnInit } from '@angular/core';
import { LivreService, Livre } from '../services/livres.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livre.component.html',
  styleUrls:[ './livre.component.css']
})
export class LivreComponent implements OnInit {
  livres: Livre[] = [];
  livre: Livre | undefined;
  errorMessage: string | null = null;
  isLoading = true; // Nouvel indicateur de chargement

  constructor(
    private livreService: LivreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchLivres();
  }

  fetchLivres(){
    this.isLoading = true;
    this.errorMessage = null;  // Réinitialiser le message d'erreur

    this.livreService.getLivres().subscribe({
      next: data => {
        this.livres = data;
        this.isLoading = false; // Chargement terminé
      },
      error: error => {
        this.errorMessage = error;
        this.isLoading = false; // Chargement terminé
      }
    });
  }

  // Méthode pour réessayer en cas d'erreur
  retryFetch() {
    this.fetchLivres(); // Recharger les abonnés
  }

  // getLivreById(id: number): void {
  //   this.livreService.getLivreById(id).subscribe((data: Livre) => {
  //     this.livre = data;
  //   });
  // }
}
