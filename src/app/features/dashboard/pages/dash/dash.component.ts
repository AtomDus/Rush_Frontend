import {Component, inject, OnInit} from '@angular/core';
import {DashService} from '../../services/dash.service';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectDTO} from '../../../project/models/projectDTO';
import {ProjectService} from '../../../project/service/project.service';
import {ProjectDetailsComponent} from '../../../project/pages/project-details/project-details.component';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dash',
  imports: [
    NgIf,
    NgForOf,
    ProjectDetailsComponent
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  isLoading: boolean = true;

  projectsEnAttente: ProjectDTO[] = [];
  projectsEnCours: ProjectDTO[] = [];
  projectsTermines: ProjectDTO[] = [];

  constructor() {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      console.error('Aucun utilisateur connecté.');
      this.isLoading = false;
      return;
    }

    const userId = currentUser.user.id;

    this.projectService.getProjectsByUserId(userId).subscribe({
      next: (projects) => {
        this.projectsEnAttente = projects.filter(p => p.status?.name === 'EN_ATTENTE');
        this.projectsEnCours = projects.filter(p => p.status?.name === 'EN_COURS');
        this.projectsTermines = projects.filter(p => p.status?.name === 'TERMINE');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets :', err);
        this.isLoading = false;
      }
    });
  }

}
