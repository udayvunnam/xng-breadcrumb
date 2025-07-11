import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChipRow, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DataService } from '../../core/data/data.service';
import { Member } from '../../core/types/member';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatIcon,
    MatTooltip,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatChipSet,
    MatChipRow,
    MatCardActions,
    MatButton,
  ],
})
export class MentorDetailsComponent implements OnInit {
  mentor: Member;

  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly dataService = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit() {
    this.getMentor();
  }

  getMentor() {
    const mentorId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentor(mentorId).subscribe((response) => {
      this.mentor = response;
      this.breadcrumbService.set('mentor/:id', this.mentor.name);
    });
  }

  editMentor() {
    this.router.navigate(['./edit'], {
      relativeTo: this.route,
      queryParams: { type: 'edit' },
    });
  }
}
