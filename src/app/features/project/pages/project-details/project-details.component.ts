import {Component, Input} from '@angular/core';
import {ProjectDTO} from '../../models/projectDTO';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
  @Input() project!: ProjectDTO;
}
