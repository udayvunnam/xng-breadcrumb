import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    selector: 'app-mentee-details',
    templateUrl: './mentee-details.component.html',
    imports: [
        NgIf,
        MatCard,
        MatCardHeader,
        MatCardAvatar,
        MatIcon,
        MatTooltip,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatChipSet,
        NgFor,
        MatChipRow,
        MatCardActions,
        MatButton,
    ]
})
export class MenteeDetailsComponent implements OnInit {
  mentee: Member;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMentee();
  }

  getMentee() {
    const menteeId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentee(menteeId).subscribe((response) => {
      this.mentee = response;
    });
  }

  editMentee() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
