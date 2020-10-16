import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';

import { Mentor } from '../../shared/models/mentor';
import { allLanguages } from '../../core/in-memory-data.service';
import { DataService } from '../../core/data.service';
import { BreadcrumbService } from '@xng/xng-breadcrumb';

@Component({
  selector: 'bd-mentor-add',
  templateUrl: './mentor-add.component.html',
  styleUrls: ['./mentor-add.component.scss'],
})
export class MentorAddComponent implements OnInit {
  mentor: unknown;
  mentorFG: FormGroup;
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
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.createForm();
    this.filteredSkills = this.mentorFG.get('skills').valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allSkills.slice()
      )
    );
    this.breadcrumbService.set('mentor/add', 'New');
  }

  createForm() {
    this.mentorFG = this.fb.group({
      name: ['', [Validators.required]],
      country: [''],
      description: [''],
      available: [new Date()],
      skills: [''],
    });
  }

  addMentor() {
    const form = this.mentorFG;

    if (form.valid) {
      const mentor = new Mentor();

      mentor.name = this.mentorFG.value.name;
      mentor.country = this.mentorFG.value.country;
      mentor.description = this.mentorFG.value.description;
      mentor.available = this.mentorFG.value.available;
      mentor.skills = this.skills;

      this.dataService.addMentor(mentor).subscribe(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: { addedMentor: mentor.id },
        };

        this.snackBar.open(`Mentor added - ${mentor.name}`, 'Ok');
        this.router.navigate(['mentor'], navigationExtras);
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

      this.mentorFG.get('skills').setValue(null);
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
    this.mentorFG.get('skills').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
