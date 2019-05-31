import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mentee-details',
  templateUrl: './mentee-details.component.html',
  styleUrls: ['./mentee-details.component.scss']
})
export class MenteeDetailsComponent implements OnInit {
  mentee: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMentee();
  }

  getMentee() {
    const menteeId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentee(menteeId).subscribe(response => {
      this.mentee = response;
    });
  }
}
