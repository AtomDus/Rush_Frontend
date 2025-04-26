import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../../auth/services/auth.service';
import {UserTokenDto} from '../../../auth/models/user-token-dto.model';

@Component({
  selector: 'app-home',
  imports: [
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  currentUser: WritableSignal<UserTokenDto | undefined>;

  welcomeMessage = signal<string>('Bienvenue sur notre site !');

  constructor() {
    this.currentUser = this._authService.currentUser;

    effect(() => {
      const user = this.currentUser();
      if (user) {
        this.welcomeMessage.set(`Bonjour ${user.user.firstname} 👋`);
      } else {
        this.welcomeMessage.set(`Bienvenue sur notre site ! Connectez-vous pour continuer.`);
      }
    });
  }

}
