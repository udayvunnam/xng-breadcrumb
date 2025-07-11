import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
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
    selector: 'app-mentee-edit',
    templateUrl: './mentee-edit.component.html',
    encapsulation: ViewEncapsulation.None,
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
    AsyncPipe
]
})
export class MenteeEditComponent implements OnInit {
  menteeId: string;
  menteeFG: UntypedFormGroup;
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
    this.getMentee();
    this.breadcrumbService.set('@menteeEdit', { skip: true });
  }

  getMentee() {
    this.menteeId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentee(this.menteeId).subscribe((response) => {
      this.skills = response.skills;
      this.createForm(response);
      this.filteredSkills = this.menteeFG.get('skills').valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice()))
      );
    });
  }

  createForm(mentee: Member) {
    this.menteeFG = this.fb.group({
      name: [mentee.name, [Validators.required]],
      country: [mentee.country],
      description: [mentee.description],
      available: [mentee.available],
      skills: [''],
      id: [mentee.id],
    });
  }

  updateMentee() {
    const form = this.menteeFG;

    if (form.valid) {
      const mentee = new Member();

      mentee.id = this.menteeFG.value.id;
      mentee.name = this.menteeFG.value.name;
      mentee.country = this.menteeFG.value.country;
      mentee.description = this.menteeFG.value.description;
      mentee.available = this.menteeFG.value.available;
      mentee.skills = this.skills;

      const navigationExtras: NavigationExtras = {
        queryParams: { editedMentee: this.menteeId },
      };

      this.dataService.updateMentee(mentee).subscribe(() => {
        this.snackBar.open(`Mentee updated - ${mentee.name}`, 'Ok');
        this.router.navigate(['mentee', this.menteeId], navigationExtras);
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

    return this.allSkills.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
