import {Component, inject, OnInit} from '@angular/core';
import {DashService} from '../../services/dash.service';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectDTO} from '../../../project/models/projectDTO';
import {ProjectDetailsComponent} from '../../../project/pages/project-details/project-details.component';
import {AuthService} from '../../../auth/services/auth.service';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dash',
  imports: [
    NgIf,
    NgForOf,
    ProjectDetailsComponent,
    FullCalendarModule,
    FormsModule
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly dashService = inject(DashService);
  private readonly router = inject(Router);
  private readonly currentUser = this.authService.currentUser();

  isFormVisible: boolean = false;
  isLoading: boolean = true;
  newProject: any = {
    name: '',
    description: '',
    startingDate: '',
    finishingDate: '',
    status: 'PENDING',
    responsableEmail: '',
    productionCompanyName: '',
    duration: 0,
    budget: 0
  };

  projectsEnAttente: ProjectDTO[] = [];
  projectsEnCours: ProjectDTO[] = [];
  projectsTermines: ProjectDTO[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      console.error('Aucun utilisateur connecté.');
      this.isLoading = false;
      return;
    }

    this.newProject.responsableEmail = currentUser.user.email;

    const userId = currentUser.user.id;
    this.loadProjects(userId);
  }

  loadProjects(userId: number): void {
    this.dashService.getProjectsByUserId(userId).subscribe({
      next: (res) => {
        const projects = res.content;

        this.projectsEnAttente = projects.filter((p: ProjectDTO) => p.status === 'PENDING');
        this.projectsEnCours = projects.filter((p: ProjectDTO) => p.status === 'OPEN');
        this.projectsTermines = projects.filter((p: ProjectDTO) => p.status === 'CLOSED');

        this.calendarOptions.events = projects.map((project: ProjectDTO) => ({
          title: project.name,
          start: project.startingDate,
          end: project.finishingDate,
          backgroundColor: this.getColorByStatus(project.status),
          extendedProps: { projectId: project.id }
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets :', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    const newProject = { ...this.newProject };

    this.dashService.createProject(newProject).subscribe({
      next: (response) => {
        console.log('Projet ajouté avec succès:', response);
        const currentUser = this.authService.currentUser();
        if (currentUser?.user?.id) {
          this.loadProjects(currentUser.user.id);
        } else {
          console.error('Utilisateur non connecté');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la création du projet:', err);
      }
    });
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'OPEN': return '#facc15';   // 🟡 Jaune
      case 'PENDING': return '#3b82f6'; // 🔵 Bleu
      case 'CLOSED': return '#10b981'; // 🟢 Vert
      default: return '#6b7280';       // ⚪ Gris
    }
  }

  handleEventClick(info: any): void {
    const projectId = info.event.extendedProps.projectId;
    this.router.navigate(['/projects', projectId]);
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

}
