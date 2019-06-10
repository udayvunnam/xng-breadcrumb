import { Component, OnInit } from '@angular/core';
import { menteeEdit } from '../../shared/constants/code';

@Component({
  selector: 'app-mentee-edit',
  templateUrl: './mentee-edit.component.html',
  styleUrls: ['./mentee-edit.component.scss']
})
export class MenteeEditComponent implements OnInit {
  code = menteeEdit;

  constructor() {}

  ngOnInit() {}
}
