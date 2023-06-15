import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { utilisateur } from '../models/utilisateur';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  public _utilisateurConnecte : BehaviorSubject<utilisateur | null> = 
  new BehaviorSubject<utilisateur | null>(null);

  constructor(
    private http : HttpClient, 
    private router : Router) {
      this.updateUserConnected();
    }

  connexion(utilisateur : utilisateur): Observable<string>{
    return this.http
      .post(environment.serverUrl+'/connexion', utilisateur, {
        responseType: 'text',
      })
    }

  updateUserConnected(){
    const jwt = localStorage.getItem("jwt")
      if(jwt != null){
        const data = jwt.split('.')[1];
        const json = window.atob(data);
        const donneesUtilisateur = JSON.parse(json);
        const utilisateur : utilisateur = {
          email : donneesUtilisateur.sub,
          lastname : donneesUtilisateur.lastname,
          firstname : donneesUtilisateur.firstname,
          role : { name : donneesUtilisateur.role },
        };
        this._utilisateurConnecte.next(utilisateur);
      } else {
        this._utilisateurConnecte.next(null);
      }
  }

  deconnexion(){
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');
  }
}
