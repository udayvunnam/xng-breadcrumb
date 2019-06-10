import { Component, OnInit } from '@angular/core';
import { mentorAdd } from '../../shared/constants/code';

@Component({
  selector: 'app-mentor-add',
  templateUrl: './mentor-add.component.html',
  styleUrls: ['./mentor-add.component.scss']
})
export class MentorAddComponent implements OnInit {
  code = mentorAdd;

  constructor() {}

  ngOnInit() {}
}
