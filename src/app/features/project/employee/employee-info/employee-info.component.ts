import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-employee-info',
  imports: [],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss'
})
export class EmployeeInfoComponent {
  @Input() employee!: Employee;
}
