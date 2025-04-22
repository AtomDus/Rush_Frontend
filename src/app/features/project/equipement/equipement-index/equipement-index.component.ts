import { Component } from '@angular/core';
import {Equipement} from '../model/equipementDTO-model';
import {EquipementIndexService} from '../service/equipement-index.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-equipement-index',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './equipement-index.component.html',
  styleUrl: './equipement-index.component.scss'
})
export class EquipementIndexComponent {
  equipements: Equipement[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private equipementService: EquipementIndexService) {}

  ngOnInit(): void {
    this.loadEquipements();
  }

  loadEquipements(): void {
    this.equipementService.getEquipements(this.currentPage, this.pageSize).subscribe(response => {
      this.equipements = response.content;
      this.totalPages = response.totalPages;
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadEquipements();
  }
}
