import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFabAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChipRow, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DataService } from '../../core/data/data.service';
import { Member } from '../../core/types/member';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styles: `
  .person.mat-icon {
    font-size: 36px;
  }

  .list-item {
    cursor: pointer;
  }
  `,
  standalone: true,
  imports: [
    MatFabAnchor,
    RouterLink,
    MatIcon,
    MatTooltip,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatChipSet,
    MatChipRow,
  ],
})
export class MentorListComponent implements OnInit {
  mentors: Member[];
  constructor(private dataService: DataService, private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.getMentors();
    this.breadcrumbService.set('mentor', 'Enabler');
  }

  getMentors() {
    this.dataService.getMentors().subscribe((response) => {
      this.mentors = response.sort((a, b) => {
        return new Date(b.updatedTs).getTime() - new Date(a.updatedTs).getTime();
      });
    });
  }
}
