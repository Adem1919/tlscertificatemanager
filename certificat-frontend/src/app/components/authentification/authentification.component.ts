import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css',
})
export class AuthentificationComponent {
  

loginForm = new FormGroup({
  username: new FormControl('', { nonNullable: true, validators: Validators.required }),
  password: new FormControl('', { nonNullable: true, validators: Validators.required }),
});


  message = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      this.userService.authenticate(this.loginForm.value).subscribe({
        next: (res) => {
          this.message = `Bienvenue ${res.username} !`;
          this.authService.login();
          console.log(res)
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/list-certif']);  // redirige vers login si pas connecté
        },
        error: () => this.message = 'Échec de la connexion.'
      });
    }
  }
}
