import { Component, OnInit } from '@angular/core';
import { PretsService, Pret, crePret } from '../services/prets.service';
import { AbonnesService, Abonne } from '../services/abonnes.service';
import { LivreService, Livre } from '../services/livres.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pret',
  standalone: true,
  imports: [ CommonModule, DatePipe, FormsModule ],
  templateUrl: './pret.component.html',
  styleUrls : ['./pret.component.css']
})
export class PretComponent implements OnInit {
  prets: Pret[] = [];
  livres: Livre[] = [];
  abonnes: Abonne[] = [];

  pipe = new DatePipe('en-US');

  isModalOpen: boolean = false;  // Pour gérer l'ouverture/fermeture de la modal
  newPret: crePret = { };

  // abonne: Abonne | undefined;
  errorMessage: string | null = null;
  isLoading = true; // Nouvel indicateur de chargement

  constructor(
    private pretsService: PretsService,
    private abonnesService: AbonnesService,
    private livresService: LivreService
  ) {}

  ngOnInit(): void {
    this.fetchPrets(); // Appel de la méthode pour récupérer les prets au démarrage
  }


  // Méthode pour récupérer les prets
  fetchPrets() {
    this.isLoading = true;
    this.pretsService.getPrets().subscribe({
      next: (data) => (this.prets = data),
      error: (err) => (this.errorMessage = 'Erreur lors de la récupération des prêts.', err),
    });

    this.livresService.getLivres().subscribe({
      next: (data) => (this.livres = data),
      error: (err) => console.error('Erreur lors de la récupération des livres:', err),
    });

    this.abonnesService.getAbonnes().subscribe({
      next: (data) => (this.abonnes = data),
      error: (err) => console.error('Erreur lors de la récupération des abonnés:', err),
    });
    this.isLoading = false;
  }

  // Méthode pour réessayer en cas d'erreur
  retryFetch() {
    this.fetchPrets(); // Recharger les prets
  }

  getLivreTitre(idLivre: number) {
    const livre = this.livres.find((l) => l.id === idLivre);
    return livre ? livre.titre : 'Livre introuvable';
  }

  getAbonneNom(idAbonne: number) {
    const abonne = this.abonnes.find((a) => a.id === idAbonne);
    return abonne ? abonne.nom + ' ' + abonne.prenom : 'Abonné introuvable';
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newPret = { }; // Réinitialiser les champs
  }

  submitForm(): void {
    if (this.newPret.id_livre && this.newPret.id_abonne && this.newPret.date_pret && this.newPret.date_retour) {
      this.pretsService.createPret(this.newPret).subscribe({
        next: (pret) => {
          this.closeModal();  // Fermer le modal
          this.retryFetch();  // Recharger les abonnés
        },
        error: (err) => {
          console.error('Erreur lors de la création du pret', err);
        }
      });
    }
    console.log(this.prets);
    console.log(this.newPret);
  }
}
