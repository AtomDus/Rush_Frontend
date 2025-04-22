import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EmployeeIndexService} from '../service/employee-index.service';
import {NgForOf, NgIf} from '@angular/common';

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
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeIndexService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.fetchEmployeesForProject();
  }

  fetchEmployeesForProject(): void {
    this.employeeService.getEmployeesByProjectId(this.projectId).subscribe(employees => {
      this.employees = employees;
    });
  }

  removeEmployeeFromProject(employeeId: number): void {
    this.employeeService.removeEmployeeFromProject(this.projectId, employeeId).subscribe(() => {
      this.fetchEmployeesForProject();
    });
  }
}
