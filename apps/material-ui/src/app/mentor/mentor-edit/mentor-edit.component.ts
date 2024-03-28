import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DataService } from '../../core/data/data.service';
import { allLanguages } from '../../core/data/in-memory-data.service';
import { Member } from '../../core/types/member';

@Component({
  selector: 'app-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
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
    NgFor,
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
export class MentorEditComponent implements OnInit {
  mentorId: string;
  mentorFG: UntypedFormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  skills = [];
  allSkills = allLanguages;
  filteredSkills: Observable<string[]>;

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private fb: UntypedFormBuilder,
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
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice()))
      );
    });
  }

  createForm(mentor: Member) {
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
      const mentor = new Member();

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

    return this.allSkills.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
