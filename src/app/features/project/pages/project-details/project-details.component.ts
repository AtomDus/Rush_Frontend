import {Component, inject, Input, OnInit} from '@angular/core';
import {EmployeeDTO, ProjectDTO, StageDTO} from '../../models/projectDTO';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../service/project.service';
import {NgForOf, NgIf} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIf,
    NgForOf,
    FullCalendarModule,
    FormsModule
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  // Services injectés via inject() pour plus de concision
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly authService = inject(AuthService);

  // État général
  project: ProjectDTO | null = null;
  searchedEmployee: EmployeeDTO | null = null;
  isLoading = true;

  // Contrôle d'affichage
  isFormVisible = false;
  isEmployeFormVisible = false;
  showEmployeeForm = false;
  showEmployeeList = false;
  showEquipementList = false;

  // Options de statut
  statusOptions = ['PENDING', 'OPEN', 'CLOSED'];

  // Configuration du calendrier FullCalendar
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    }
  };

  // Modèle de formulaire de stage
  newStage: any = {
    name: '',
    description: '',
    startingDate : new Date(),
    finishingDate : new Date()
  };

  // Modèle de formulaire employé
  newEmploye: any = {
    firstname: '',
    lastname: '',
    jobTitle: '',
    email: '',
    phoneNumber: ''
  };

  constructor() {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      console.error('Aucun utilisateur connecté.');
      this.isLoading = false;
      return;
    }

    // On affecte l'email du responsable par défaut au stage
    this.newStage.responsableEmail = currentUser.user.email;

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProject(id);
  }

  // Chargement du projet
  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;

        // On alimente les événements du calendrier avec les stages du projet
        if (this.project?.stages) {
          this.calendarOptions.events = this.project.stages.map(stage => ({
            title: stage.name,
            start: stage.startingDate,
            end: stage.finishingDate,
            description: stage.description,
            backgroundColor: '#facc15',
            extendedProps: { stageId: stage.id }
          }));
        }
      },
      error: (err) => {
        console.error('Erreur chargement projet:', err);
        this.isLoading = false;
      }
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Soumission du formulaire d'ajout de stage
  onSubmitStageForm(form: NgForm): void {
    const newStage = { ...this.newStage };
    if (form.valid) {
      this.projectService.addStage(this.project?.id!, newStage).subscribe({
        next: (data) => {
          console.log('Stage ajouté avec succès:', data);
          this.loadProject(this.project?.id!);
          this.isFormVisible = false;
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du stage:', err);
        }
      });
    }
  }

  toggleEmployeFormVisibility(): void {
    this.isEmployeFormVisible = !this.isEmployeFormVisible;
  }

  // Soumission du formulaire manuel d'ajout d'employé
  onSubmitEmployeForm(form: NgForm): void {
    const newEmploye = { ...this.newEmploye };
    if (form.valid) {
      this.projectService.addEmployee(this.project?.id!, newEmploye).subscribe({
        next: (data) => {
          console.log('Employé ajouté avec succès:', data);
          this.loadProject(this.project?.id!);
          this.isEmployeFormVisible = false; // fix ici : c’était isFormVisible par erreur
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'employé:', err);
        }
      });
    }
  }

  // Recherche d'employé par email
  onSearchEmployee(email: string): void {
    if (!email || !this.project?.id) return;

    this.projectService.findEmployeeByEmail(email).subscribe({
      next: (employee) => {
        this.searchedEmployee = employee;
        this.showEmployeeForm = false;

        if (!this.project) return;

        // Ajout direct de l'employé trouvé au projet
        this.projectService.addEmployee(this.project!.id, employee).subscribe({
          next: (updatedProject) => {
            this.project = updatedProject;
            console.log("Employé ajouté au projet.");
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
          }
        });
      },
      error: (error) => {
        // Si l'employé n'existe pas en base (404), on affiche le formulaire de création
        if (error.status === 404) {
          console.log("Employé non trouvé, affichage du formulaire.");
          this.searchedEmployee = null;
          this.showEmployeeForm = true;
        } else {
          console.error("Erreur lors de la recherche :", error);
        }
      }
    });
  }

  onShowEmployeeList(): void {
    this.showEmployeeList = !this.showEmployeeList;
  }

  onShowEquipementList(): void {
    this.showEquipementList = !this.showEquipementList;
  }
}
