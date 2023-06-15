import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageService } from './image.service';
import { utilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public _utilisateurs : BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private imageService : ImageService) { }

  public getUtilisateurs(){
    this.http
    .get<utilisateur[]>(environment.serverUrl+ '/utilisateurs')
    .subscribe((utilisateurs: utilisateur[])=>{
      for(let utilisateur of utilisateurs){
      this.imageService.chargementImageProfil(utilisateur);
    }
    this._utilisateurs.next(utilisateurs)
  });
    
  }

  public deleteUtilisateur(id: number) : Observable<any>{
    return this.http.delete(environment.serverUrl+ "/admin/utilisateur/"+id)

  }

  public editionUtilisateur(formData:any): Observable<any>{
    return this.http.post(environment.serverUrl+ "/admin/utilisateur", formData);
  }

  public getUtilisateur(id : number): Observable<any>{
    return this.http.get(environment.serverUrl+ "/utilisateur/" + id)
  }
}
