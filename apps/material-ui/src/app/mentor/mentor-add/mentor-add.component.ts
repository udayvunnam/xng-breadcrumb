import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DataService } from '../../core/data/data.service';
import { allLanguages } from '../../core/data/in-memory-data.service';
import { Member } from '../../core/types/member';

@Component({
  selector: 'app-mentor-add',
  templateUrl: './mentor-add.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatAutocompleteTrigger,
    MatChipInput,
    MatAutocomplete,
    MatOption,
    MatHint,
    MatCardActions,
    MatButton,
    RouterLink,
    AsyncPipe,
  ],
})
export class MentorAddComponent implements OnInit {
  mentor: unknown;
  mentorFG: UntypedFormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  skills = [];
  allSkills = allLanguages;
  filteredSkills: Observable<string[]>;

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private readonly fb = inject(UntypedFormBuilder);
  private readonly dataService = inject(DataService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.createForm();
    this.filteredSkills = this.mentorFG.get('skills').valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice()))
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
      const mentor = new Member();

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

    return this.allSkills.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
