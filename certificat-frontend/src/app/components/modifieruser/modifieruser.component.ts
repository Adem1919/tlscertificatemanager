import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modifieruser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifieruser.component.html',
  styleUrl: './modifieruser.component.css'
})
export class ModifieruserComponent implements OnInit {

  userForm!: FormGroup;
  userId!: number;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm = new FormGroup({
      id: new FormControl(this.userId),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => this.userForm.patchValue(user),
      error: () => this.message = 'Erreur lors du chargement des données.'
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe({
        next: () => {
          this.message = 'Utilisateur mis à jour avec succès.';
          this.router.navigate(['/list-user']); // redirection après maj
        },
        error: () => this.message = 'Erreur lors de la mise à jour.'
      });
    }
  }
}
