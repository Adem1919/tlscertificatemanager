import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ChatbotStateService } from '../../services/chatbot-state.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  isOpen: boolean = false;
  isMinimized: boolean = false;
  messages: ChatMessage[] = [];
  
  newMessage: string = '';
  isLoading: boolean = false;
  hasNewMessage: boolean = false;
  private chatbotApiUrl = 'http://localhost:8089/certificatmanager/api/chatbot';
  private subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private chatbotStateService: ChatbotStateService
  ) {}

  ngOnInit() {
    // Subscribe to chatbot state changes from navbar only for open/close, not minimize
    this.subscription.add(
      this.chatbotStateService.openChat$.subscribe(shouldOpen => {
        // Only handle complete open/close from external sources (navbar)
        // Ignore minimize state changes
        if (shouldOpen && !this.isOpen) {
          this.openChatInternal();
        } else if (!shouldOpen && this.isOpen && !this.isMinimized) {
          // Only close if not minimized (to avoid conflicts)
          this.closeChatInternal();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.chatbotStateService.toggleChatbot();
  }

  minimizeChat() {
    // Only toggle minimized state, don't affect the service
    this.isMinimized = !this.isMinimized;
  }

  closeChat() {
    // When closing via X button, ensure we're not minimized and update service
    this.isMinimized = false;
    this.closeChatInternal();
    this.chatbotStateService.closeChatbot();
  }

  openChat() {
    this.openChatInternal();
  }

  // Internal methods that don't trigger service updates
  private openChatInternal() {
    this.isOpen = true;
    this.isMinimized = false;
    this.hasNewMessage = false;
    
    // Initialize with welcome message if first time opening
    if (this.messages.length === 0) {
      this.messages.push({
        text: "👋 Bonjour ! Je suis votre assistant spécialisé dans les certificats TLS. Comment puis-je vous aider aujourd'hui ?",
        isUser: false,
        timestamp: new Date()
      });
    }
  }

  private closeChatInternal() {
    this.isOpen = false;
    this.isMinimized = false;
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.isLoading) return;

    // Add user message
    this.messages.push({
      text: this.newMessage,
      isUser: true,
      timestamp: new Date()
    });

    const userQuestion = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    // Add typing indicator
    this.messages.push({
      text: '',
      isUser: false,
      timestamp: new Date(),
      isTyping: true
    });

    // Call chatbot API
    this.http.post<any>(`${this.chatbotApiUrl}/ask`, { question: userQuestion })
      .subscribe({
        next: (response) => {
          // Remove typing indicator
          this.messages = this.messages.filter(msg => !msg.isTyping);
          
          // Add bot response
          this.messages.push({
            text: response.answer || 'Je suis désolé, je n\'ai pas pu traiter votre question.',
            isUser: false,
            timestamp: new Date()
          });
          this.isLoading = false;
          
          // Show notification if chat is minimized
          if (this.isMinimized || !this.isOpen) {
            this.hasNewMessage = true;
          }
        },
        error: (error) => {
          console.error('Erreur chatbot:', error);
          // Remove typing indicator
          this.messages = this.messages.filter(msg => !msg.isTyping);
          
          // Add error message
          this.messages.push({
            text: 'Je suis désolé, je rencontre des difficultés techniques. Je suis spécialisé dans les certificats TLS.',
            isUser: false,
            timestamp: new Date()
          });
          this.isLoading = false;
          
          // Show notification if chat is minimized
          if (this.isMinimized || !this.isOpen) {
            this.hasNewMessage = true;
          }
        }
      });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  clearChat() {
    this.messages = [
      {
        text: "👋 Bonjour ! Je suis votre assistant spécialisé dans les certificats TLS. Comment puis-je vous aider aujourd'hui ?",
        isUser: false,
        timestamp: new Date()
      }
    ];
    this.hasNewMessage = false;
  }

  getSuggestedQuestions() {
    return [
      "Qu'est-ce qu'un certificat TLS ?",
      "Comment installer un certificat SSL ?",
      "Quelle est la différence entre SSL et TLS ?",
      "Qu'est-ce qu'HTTPS ?",
      "Comment générer une CSR ?"
    ];
  }

  askSuggestedQuestion(question: string) {
    this.newMessage = question;
    this.sendMessage();
  }
}
