import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LivreService } from './services/livres.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'biblio_frontend';
  constructor(private Livre: LivreService) { }
  ngOnInit(): void {
    this.Livre.getLivres().subscribe(res => {
      console.log(res);
    });
  }
}
