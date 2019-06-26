import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'projects/xng-breadcrumb/src/public-api';

import { DataService } from '../../core/data.service';
import { mentorDetails } from '../../shared/constants/code';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  code = mentorDetails;
  mentor: any;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMentor();
  }

  getMentor() {
    const mentorId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentor(mentorId).subscribe(response => {
      this.mentor = response;
      this.breadcrumbService.set('mentor/:id', this.mentor.name);
    });
  }

  editMentor() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
