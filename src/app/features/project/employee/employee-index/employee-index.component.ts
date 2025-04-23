import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EmployeeIndexService} from '../service/employee-index.service';
import {NgForOf, NgIf} from '@angular/common';
import {Employee} from '../model/employeeDTO-model';

@Component({
  selector: 'app-employee-index',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './employee-index.component.html',
  styleUrl: './employee-index.component.scss'
})
export class EmployeeIndexComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeIndexService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    console.log('Project ID:', projectId);

    if (projectId) {
      this.fetchEmployeesForProject(+projectId);
    } else {
      this.fetchAllEmployees(); // ajoute cette méthode dans ton service aussi
    }
  }

  fetchEmployeesForProject(projectId: number): void {
    this.employeeService.getEmployeesByProjectId(projectId).subscribe({
      next: (employees) => this.employees = employees,
      error: (err) => console.error('Erreur chargement employés par projet:', err)
    });
  }

  fetchAllEmployees(): void {
    // Appelle ici une méthode que tu dois ajouter au service
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => this.employees = employees,
      error: (err) => console.error('Erreur chargement tous les employés:', err)
    });
  }
}
