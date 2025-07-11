import { Component, inject, OnInit } from '@angular/core';
import { MatFabAnchor } from '@angular/material/button';
import { MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChipRow, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data/data.service';
import { Member } from '../../core/types/member';

@Component({
  selector: 'app-mentee-list',
  templateUrl: './mentee-list.component.html',
  styles: `.mat-card {
    cursor: pointer;
  }`,
  imports: [
    MatFabAnchor,
    RouterLink,
    MatIcon,
    MatTooltip,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatChipSet,
    MatChipRow,
  ],
})
export class MenteeListComponent implements OnInit {
  mentees: Member[];

  private readonly dataService = inject(DataService);

  ngOnInit() {
    this.getMentees();
  }

  getMentees() {
    this.dataService.getMentees().subscribe((response) => {
      this.mentees = response.sort((a, b) => {
        return new Date(b.updatedTs).getTime() - new Date(a.updatedTs).getTime();
      });
    });
  }
}
