import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../core/data.service';
import { MatSnackBar } from '@angular/material';
import { Mentee } from '../../shared/models/mentee';
import { allLanguages } from '../../core/in-memory-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mentee-add',
  templateUrl: './mentee-add.component.html',
  styleUrls: ['./mentee-add.component.scss']
})
export class MenteeAddComponent implements OnInit {
  mentee: any;
  menteeFG: FormGroup;
  progressSave: boolean;
  skills = allLanguages;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.menteeFG = this.fb.group({
      name: ['', [Validators.required]],
      country: [''],
      description: [''],
      available: [new Date()],
      skills: ['', [Validators.required]]
    });
  }

  addMentee() {
    const form = this.menteeFG;

    if (form.valid) {
      const mentee = new Mentee();

      mentee.name = this.menteeFG.value.name;
      mentee.country = this.menteeFG.value.country;
      mentee.description = this.menteeFG.value.description;
      mentee.available = this.menteeFG.value.available;
      mentee.skills = this.menteeFG.value.skills;

      this.dataService.addMentee(mentee).subscribe((response: any) => {
        this.snackBar.open(`mentee "${mentee.name}"added `);
      });
    }
  }
}
