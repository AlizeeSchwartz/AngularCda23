import { Component } from '@angular/core';
import { ConnexionService } from './services/connexion.service';
import { utilisateur } from './models/utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  utilisateurConnecte : utilisateur | null = null;

  constructor(private connexionService : ConnexionService){}

  ngOnInit(){
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur)  
    );
  }

  onDeconnexion(){
    this.connexionService.deconnexion();
  }
}
