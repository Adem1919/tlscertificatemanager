import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User, Role } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  roles = Object.values(Role); // ['ADMIN', 'USER']
  message = '';

  constructor(private userService: UserService,
        private router: Router,
  ) {}

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: any = this.userForm.value;
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.message = 'Utilisateur ajouté avec succès.';
          this.router.navigate(['/list-user']); // redirection après maj
        },
        error: () => this.message = 'Erreur lors de l’ajout.'
      });
    }
  }
}
