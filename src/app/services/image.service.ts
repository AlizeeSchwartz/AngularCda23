import { HttpClient } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { utilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient, private sanitizer : DomSanitizer) { }

  

  chargementImageProfil(utilisateur : utilisateur){

    if(utilisateur.nomImageProfil != null){


      this.http
      .get(environment.serverUrl +"/image-profil/" + utilisateur.id, {responseType : 'blob'})
      .subscribe((donneeImage : any) => {
        utilisateur.imageProfil = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(donneeImage)
         );   
      });
    }
  }
}
