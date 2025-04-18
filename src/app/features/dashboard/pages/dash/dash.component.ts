import {Component, OnInit} from '@angular/core';
import {DashService} from '../../services/dash.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dash',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {
  pendingProjects: any[] = [];
  openProjects: any[] = [];
  closedProjects: any[] = [];

  selectedStatus: 'PENDING' | 'OPEN' | 'CLOSED' | null = null;

  constructor(private dashService: DashService) {}

  ngOnInit(): void {
    this.dashService.getOpenProjects().subscribe({
      next: (response) => {
        this.openProjects = response.results; // 👈 C'est ici le point clé
      },
      error: (err) => {
        console.error('Erreur de chargement des projets OPEN', err);
      }
    });
  }

  showDetails(status: 'PENDING' | 'OPEN' | 'CLOSED') {
    this.selectedStatus = this.selectedStatus === status ? null : status;
  }

  getProjectsByStatus(): any[] {
    switch (this.selectedStatus) {
      case 'PENDING': return this.pendingProjects;
      case 'OPEN': return this.openProjects;
      case 'CLOSED': return this.closedProjects;
      default: return [];
    }
  }

  createProject() {
    const newProject = {
      name: 'Nouveau Projet',
      description: 'Description du projet',
      startingDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    };

    this.dashService.createProject(newProject).subscribe({
      next: (res) => {
        console.log('Projet créé !', res);
        // Tu peux recharger la liste ici ou afficher un toast
      },
      error: (err) => {
        console.error('Erreur création projet', err);
      }
    });
  }
}
