import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { Pages404Component } from './pages/pages404/pages404.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { Page403Component } from './pages/page403/page403.component';


const routes: Routes = [
  {path: "accueil", component: AccueilComponent, canActivate : [UserGuard]},
  {path: "connexion", component: ConnexionComponent},
  {path:"ajout-utilisateur", component: EditionUtilisateurComponent, canActivate : [AdminGuard]},
  {path:"edit-utilisateur/:id", component: EditionUtilisateurComponent, canActivate : [AdminGuard]},
  {path: "", redirectTo: "accueil", pathMatch: "full"},
  {path:"droits-insuffisants", component: Page403Component},
  {path: "**", component: Pages404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
