import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guard/auth.guard';
import { CertificatComponent } from './components/certificat/certificat.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { ModifieruserComponent } from './components/modifieruser/modifieruser.component';
import { ListCertificatComponent } from './components/list-certificat/list-certificat.component';
import { ModifiercertifComponent } from './components/modifiercertif/modifiercertif.component';
import { AddcertifComponent } from './components/addcertif/addcertif.component';
import { AffichercertificatComponent } from './components/affichercertificat/affichercertificat.component';
import { ModifierEtatComponent } from './components/modifieretat/modifieretat.component';

export const routes: Routes = [
    { path: 'login', component: AuthentificationComponent },
    { path: 'edit-user/:id', component: ModifieruserComponent , canActivate: [AuthGuard] },
    { path: 'add-user', component: AdduserComponent, canActivate: [AuthGuard] },
    { path: 'list-user', component: ListusersComponent, canActivate: [AuthGuard] },
    { path: 'list-certif', component: ListCertificatComponent, canActivate: [AuthGuard] },
    { path: 'edit-certif/:id', component: ModifiercertifComponent , canActivate: [AuthGuard] },
    { path: 'add-certif', component: AddcertifComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'certificats', component: CertificatComponent, canActivate: [AuthGuard] },
    { path: 'afficher-certif/:id', component: AffichercertificatComponent, canActivate: [AuthGuard] },
    { path: 'modifier-etat/:id', component: ModifierEtatComponent, canActivate: [AuthGuard] },
    //{ path: '', redirectTo: '/users', pathMatch: 'full' } // redirection par défaut
];
