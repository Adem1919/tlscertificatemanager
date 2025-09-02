import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotStateService {
  private openChatSubject = new BehaviorSubject<boolean>(false);
  public openChat$ = this.openChatSubject.asObservable();

  constructor() { }

  openChatbot() {
    if (!this.openChatSubject.value) {
      this.openChatSubject.next(true);
    }
  }

  closeChatbot() {
    if (this.openChatSubject.value) {
      this.openChatSubject.next(false);
    }
  }

  toggleChatbot() {
    const currentState = this.openChatSubject.value;
    this.openChatSubject.next(!currentState);
  }

  getCurrentState(): boolean {
    return this.openChatSubject.value;
  }
}
