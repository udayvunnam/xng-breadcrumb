import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Mentee } from '../../shared/models/mentee';
import { DataService } from '../../core/data.service';
import { allLanguages } from '../../core/in-memory-data.service';

@Component({
  selector: 'bd-mentee-add',
  templateUrl: './mentee-add.component.html',
  styleUrls: ['./mentee-add.component.scss'],
})
export class MenteeAddComponent implements OnInit {
  mentee: unknown;
  menteeFG: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  skills = [];
  allSkills = allLanguages;
  filteredSkills: Observable<string[]>;

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.filteredSkills = this.menteeFG.get('skills').valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allSkills.slice()
      )
    );
  }

  createForm() {
    this.menteeFG = this.fb.group({
      name: ['', [Validators.required]],
      country: [''],
      description: [''],
      available: [new Date()],
      skills: [''],
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
      mentee.skills = this.skills;

      this.dataService.addMentee(mentee).subscribe(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: { addedMentor: mentee.id },
        };

        this.snackBar.open(`Mentee added - ${mentee.name}`, 'Ok');
        this.router.navigate(['mentee'], navigationExtras);
      });
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete?.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.menteeFG.get('skills').setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.menteeFG.get('skills').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
