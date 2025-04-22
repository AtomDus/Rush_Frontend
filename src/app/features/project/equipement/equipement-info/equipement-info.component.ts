import { Component } from '@angular/core';
import {Equipement} from '../model/equipementDTO-model';
import {ActivatedRoute} from '@angular/router';
import {EquipementIndexService} from '../service/equipement-index.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-equipement-info',
  imports: [
    NgIf
  ],
  templateUrl: './equipement-info.component.html',
  styleUrl: './equipement-info.component.scss'
})
export class EquipementInfoComponent {
  equipement: Equipement | null = null;

  constructor(
    private route: ActivatedRoute,
    private equipementService: EquipementIndexService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const equipementId = Number(idParam);
      this.equipementService.getEquipementById(equipementId).subscribe(equipement => {
        this.equipement = equipement;
      });
    } else {
      console.error('No equipement ID found in route.');
    }
  }

}
