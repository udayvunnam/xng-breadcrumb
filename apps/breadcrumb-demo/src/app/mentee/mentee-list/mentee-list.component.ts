import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data.service';
import { Mentor } from '../../shared/models/mentor';

@Component({
  selector: 'bd-mentee-list',
  templateUrl: './mentee-list.component.html',
  styleUrls: ['./mentee-list.component.scss'],
})
export class MenteeListComponent implements OnInit {
  mentees: Mentor[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getMentees();
  }

  getMentees() {
    this.dataService.getMentees().subscribe((response) => {
      this.mentees = response.sort((a, b) => {
        return (
          new Date(b.updatedTs).getTime() - new Date(a.updatedTs).getTime()
        );
      });
    });
  }
}
