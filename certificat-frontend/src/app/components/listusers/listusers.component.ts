import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listusers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.css'
})
export class ListusersComponent implements OnInit {

  users: User[] = [];
  message = '';
  user:any
  role:any

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.role = this.user.role;
    }
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: () => this.message = 'Erreur lors du chargement des utilisateurs.'
    });
  }

  deleteUser(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.message = 'Utilisateur supprimé avec succès.';
          this.loadUsers(); // recharger la liste
        },
        error: () => this.message = 'Erreur lors de la suppression.'
      });
    }
  }

  editUser(user: User) {
    // Exemple de navigation vers un composant de modification avec ID
    this.router.navigate(['/edit-user', user.id]);
  }
  addUser(){
    this.router.navigate(['/add-user']);
  }
}
