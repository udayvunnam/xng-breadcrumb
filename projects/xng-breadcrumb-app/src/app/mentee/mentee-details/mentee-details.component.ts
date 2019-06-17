import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'projects/xng-breadcrumb/src/public-api';

import { DataService } from '../../core/data.service';
import { menteeDetails } from '../../shared/constants/code';

@Component({
  selector: 'app-mentee-details',
  templateUrl: './mentee-details.component.html',
  styleUrls: ['./mentee-details.component.scss']
})
export class MenteeDetailsComponent implements OnInit {
  code = menteeDetails;
  mentee: any;
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

    this.dataService.getMentee(menteeId).subscribe(response => {
      this.mentee = response;
      this.breadcrumbService.setForAlias('menteeName', this.mentee.name);
    });
  }

  editMentee() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
