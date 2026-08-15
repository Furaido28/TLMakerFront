import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../core/services/users-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  selectedUserId = signal<number | null>(null);

  ngOnInit(): void {
    // Récupérer l'ID stocké pour pré-sélectionner le bon utilisateur dans le select
    const currentId = this.userService.getCurrentUserId();
    if (currentId) {
      this.selectedUserId.set(currentId);
    }

    this.userService.getAllUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  onUserChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const userId = Number(select.value);

    if (!userId) return;

    // Déclencher la requête HTTP via .subscribe()
    this.userService.login(userId).subscribe({
      next: () => {
        this.selectedUserId.set(userId);
        console.log('Utilisateur sélectionné ID:', this.userService.getCurrentUserId());
      },
      error: (err) => console.error('Erreur lors de la connexion', err)
    });
  }
}
