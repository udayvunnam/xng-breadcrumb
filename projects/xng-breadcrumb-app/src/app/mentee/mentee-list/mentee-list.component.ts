import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-mentee-list',
  templateUrl: './mentee-list.component.html',
  styleUrls: ['./mentee-list.component.scss']
})
export class MenteeListComponent implements OnInit {
  mentees: any[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMentors().subscribe(response => {
      this.mentees = response;
    });
  }
}
