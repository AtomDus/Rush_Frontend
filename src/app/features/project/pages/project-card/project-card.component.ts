import {Component, Input} from '@angular/core';
import {ProjectDTO} from '../../models/projectDTO';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIf
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: ProjectDTO;
}
