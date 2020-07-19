import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-mentee-details',
  templateUrl: './mentee-details.component.html',
  styleUrls: ['./mentee-details.component.scss']
})
export class MenteeDetailsComponent implements OnInit {
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
      this.breadcrumbService.set('@menteeName', this.mentee.name);
    });
  }

  editMentee() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
