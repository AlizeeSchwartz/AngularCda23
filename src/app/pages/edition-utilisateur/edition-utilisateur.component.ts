import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { pays } from 'src/app/models/pays';
import { utilisateur } from 'src/app/models/utilisateur';
import { PaysService } from 'src/app/services/pays.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.scss']
})
export class EditionUtilisateurComponent {

  formulaire: FormGroup = this.formBuilder.group({
    email:["", [Validators.email, Validators.required]],
    lastname: ["",[Validators.required, Validators.minLength(3)]],
    
    firstname:["", Validators.required],
    pays:[null, []]
  })


constructor(private formBuilder: FormBuilder, private http: HttpClient, private router : Router, private route: ActivatedRoute, private serviceUtilisateur  :UtilisateurService, private servicePays : PaysService){}

public idUtilisateur : number | undefined;
codeRetour: number = 0;
messageErreur: string = "";
listPays: pays[] = [];
fichier : File | null = null;

ngOnInit(){

  this.servicePays.getPays().subscribe({
    next: listPays => this.listPays = listPays,
    error : erreur => console.log(erreur)
  })


  this.route.params.subscribe(
    parametres => {this.idUtilisateur = parametres['id']
  if(this.idUtilisateur != null) {
    this.serviceUtilisateur
    .getUtilisateur(this.idUtilisateur)
    .subscribe({
      next:(utilisateur: utilisateur) => {

        this.formulaire.get("email")?.setValue(utilisateur.email)
        this.formulaire.get("lastname")?.setValue(utilisateur.lastname)
        this.formulaire.get("firstname")?.setValue(utilisateur.firstname)
        this.formulaire.get("pays")?.setValue(utilisateur.pays);
  
      },
      error: erreurRequete => {
        if(erreurRequete.status === 404){
          this.codeRetour = 404
        } else {
          this.codeRetour = 500
          this.messageErreur = erreurRequete.messageErreur
        }
      },
      
    });
    }
  });
}

  onImageSelectionne(evenement : any){
    this.fichier = evenement.target.files[0];
  }

  comparePays(paysOption: any, paysUtilisateur:any){
    return paysUtilisateur != null && paysUtilisateur.id == paysOption.id;
  }


  onSubmit(){
    if(this.formulaire.valid){
      const formData = new FormData();
      
      const utilisateur : utilisateur = this.formulaire.value;
      utilisateur.id = this.idUtilisateur;

      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'utilisateur',
        new Blob([JSON.stringify(utilisateur)], {
          type: 'application/json',
        })
      );
      
      this.serviceUtilisateur.editionUtilisateur(formData)
      .subscribe(resultat => this.router.navigateByUrl("accueil"))
    }
  }
}
