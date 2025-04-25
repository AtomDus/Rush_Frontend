import {Component, inject, Input, OnInit} from '@angular/core';
import {EmployeeDTO, ProjectDTO, StageDTO} from '../../models/projectDTO';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../service/project.service';
import {NgForOf, NgIf} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../auth/services/auth.service';
import {EquipementService} from '../../equipement/service/equipement.service';
import {RentingCompany} from '../../equipement/model/equipementDTO-model';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIf,
    NgForOf,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly authService = inject(AuthService);
  private readonly equipementService = inject(EquipementService);

  project: ProjectDTO | null = null;
  searchedEmployee: EmployeeDTO | null = null;
  isLoading = true;

  isFormVisible = false;
  isEmployeFormVisible = false;
  showEmployeeForm = false;
  showAddEquipementForm = false;


  showEmployeeList = false;
  showEquipementList = false;

  statusOptions = ['PENDING', 'OPEN', 'CLOSED'];

  ownerName: string = '';
  foundOwner: RentingCompany | null = null;

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

  newStage: any = {
    name: '',
    description: '',
    startingDate : new Date(),
    finishingDate : new Date()
  };

  newEmploye: any = {
    firstname: '',
    lastname: '',
    jobTitle: '',
    email: '',
    phoneNumber: ''
  };

  newEquipement: any = {
    name: '', // Nom de l'équipement
    owner: {
      id: 0, // L'ID du RentingCompany, tu le récupéreras probablement via un autre service ou sélection
      name: '',
      address: '',
      city: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      email: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: ''
    },
    description: '', // Description de l'équipement
    model: '', // Modèle de l'équipement
    type: '', // Type de l'équipement
    serialNumber: '', // Numéro de série
    plannedRevisionDate: null, // Date de révision prévue, peut-être null si aucune date
    condition: 'NEW', // Condition de l'équipement, par défaut "NEW"
    stock: 0, // Quantité en stock
    stockLocation: '', // Emplacement de stockage
    acquisitionDate: null, // Date d'acquisition
    lastRevision: null // Date de la dernière révision
  };

  constructor() {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      console.error('Aucun utilisateur connecté.');
      this.isLoading = false;
      return;
    }

    this.newStage.responsableEmail = currentUser.user.email;

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProject(id);
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;

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

  onSearchEmployee(email: string): void {
    if (!email || !this.project?.id) return;

    this.projectService.findEmployeeByEmail(email).subscribe({
      next: (employee) => {
        this.searchedEmployee = employee;
        this.showEmployeeForm = false;

        if (!this.project) return;

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

  searchRentingCompany(name: string): void {
    if (name.trim()) {
      this.equipementService.getRentingCompanyByName(name).subscribe({
        next: (data) => {
          this.foundOwner = data;
          this.newEquipement.owner = data;  // Met à jour le propriétaire dans l'équipement
        },
        error: (err) => {
          console.error('Erreur recherche du propriétaire:', err);
          this.foundOwner = null;
        }
      });
    } else {
      this.foundOwner = null;
    }
  }

  onShowAddEquipementForm(): void {
    this.showAddEquipementForm = !this.showAddEquipementForm;
  }

  onSubmitEquipementForm(form: NgForm): void {
    if (form.valid && this.project) {
      const newEquipement = { ...this.newEquipement };

      this.equipementService.addEquipement(this.project.id!, newEquipement).subscribe({
        next: (data) => {
          console.log('Équipement ajouté avec succès:', data);
          this.loadProject(this.project!.id); // Recharger le projet après ajout, en passant l'ID du projet
          this.showAddEquipementForm = false; // Masquer le formulaire après soumission
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'équipement:', err);
        }
      });
    }
  }
}
