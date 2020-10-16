import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { allLanguages } from '../../core/in-memory-data.service';
import { DataService } from '../../core/data.service';
import { Mentor } from '../../shared/models/mentor';
import { BreadcrumbService } from '@xng/xng-breadcrumb';

@Component({
  selector: 'bd-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  styleUrls: ['./mentor-edit.component.scss'],
})
export class MentorEditComponent implements OnInit {
  mentorId: string;
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
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.getMentor();
    this.breadcrumbService.set('mentor/:id/edit', { skip: true });
  }

  getMentor() {
    this.mentorId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentor(this.mentorId).subscribe((response) => {
      this.skills = response.skills;
      this.createForm(response);
      this.filteredSkills = this.mentorFG.get('skills').valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.allSkills.slice()
        )
      );
    });
  }

  createForm(mentor: Mentor) {
    this.mentorFG = this.fb.group({
      name: [mentor.name, [Validators.required]],
      country: [mentor.country],
      description: [mentor.description],
      available: [mentor.available],
      skills: [''],
      id: [mentor.id],
    });
  }

  updateMentor() {
    const form = this.mentorFG;

    if (form.valid) {
      const mentor = new Mentor();

      mentor.id = this.mentorFG.value.id;
      mentor.name = this.mentorFG.value.name;
      mentor.country = this.mentorFG.value.country;
      mentor.description = this.mentorFG.value.description;
      mentor.available = this.mentorFG.value.available;
      mentor.skills = this.skills;

      const navigationExtras: NavigationExtras = {
        queryParams: { editedMentee: this.mentorId },
      };

      this.dataService.updateMentor(mentor).subscribe(() => {
        this.snackBar.open(`Mentor updated - ${mentor.name}`, 'Ok');
        this.router.navigate(['mentor', this.mentorId], navigationExtras);
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
