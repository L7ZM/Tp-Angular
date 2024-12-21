import { Component, OnInit } from '@angular/core';
import { AbonnesService, Abonne } from '../services/abonnes.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-abonne',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './abonne.component.html',
  styleUrls: ['./abonne.component.css']
})
export class AbonneComponent implements OnInit{
  abonnes: Abonne[] = [];

  isModalOpen: boolean = false;  // Pour gérer l'ouverture/fermeture de la modal
  newAbonne: Abonne = { nom: '', prenom: '', adresse: '' }; // Nouveau abonné à ajouter

  // abonne: Abonne | undefined;
  errorMessage: string | null = null;
  isLoading = true; // Nouvel indicateur de chargement

  constructor(
    private abonnesService: AbonnesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchAbonnes(); // Appel de la méthode pour récupérer les abonnés au démarrage
  }

  // Méthode pour récupérer les abonnés
  fetchAbonnes() {
    this.isLoading = true;
    this.errorMessage = null;  // Réinitialiser le message d'erreur

    this.abonnesService.getAbonnes().subscribe({
      next: data => {
        this.abonnes = data;
        this.isLoading = false; // Chargement terminé
      },
      error: error => {
        this.isLoading = false; // Chargement terminé
        this.errorMessage = error.message || 'Impossible de récupérer les données. Veuillez réessayer plus tard.'; // Vérification du message d'erreur
      }
    });
  }

  // Méthode pour réessayer en cas d'erreur
  retryFetch() {
    this.fetchAbonnes(); // Recharger les abonnés
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newAbonne = { id: 0, nom: '', prenom: '', adresse: '' }; // Réinitialiser les champs
  }

  submitForm(): void {
    if (this.newAbonne.nom && this.newAbonne.prenom && this.newAbonne.adresse) {
      this.abonnesService.createAbonne(this.newAbonne).subscribe({
        next: (abonne) => {
          this.closeModal();  // Fermer le modal
          this.retryFetch();  // Recharger les abonnés
        },
        error: (err) => {
          console.error('Erreur lors de la création d\'un abonné', err);
        }
      });
    }
  }
}
