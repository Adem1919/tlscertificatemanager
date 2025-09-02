import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatbotStateService } from '../../services/chatbot-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private chatbotStateService: ChatbotStateService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUsername(): string | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.username;
    }
    return null;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  users(){
    this.router.navigate(['/list-user']);
  }

  certif(){
    this.router.navigate(['/list-certif']);
  }

  chatbot(){
    this.chatbotStateService.toggleChatbot();
  }
}
