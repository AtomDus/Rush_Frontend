import {Component, inject, Input, OnInit} from '@angular/core';
import {ProjectDTO} from '../../models/projectDTO';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../service/project.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  project: ProjectDTO | null = null;
  isLoading = true;

  constructor(
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProject(id);
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement projet:', err);
        this.isLoading = false;
      }
    });
  }
}
