import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatSnackBar, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

import { menteeEdit } from '../../shared/constants/code';
import { DataService } from '../../core/data.service';
import { allLanguages } from '../../core/in-memory-data.service';
import { Mentee } from '../../shared/models/mentee';

@Component({
  selector: 'app-mentee-edit',
  templateUrl: './mentee-edit.component.html',
  styleUrls: ['./mentee-edit.component.scss']
})
export class MenteeEditComponent implements OnInit {
  code = menteeEdit;
  mentee: any;
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMentee();
  }

  getMentee() {
    const menteeId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentee(menteeId).subscribe(response => {
      this.skills = response.skills;
      this.createForm(response);
      this.filteredSkills = this.menteeFG.get('skills').valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice()))
      );
    });
  }

  createForm(mentee: Mentee) {
    this.menteeFG = this.fb.group({
      name: [mentee.name, [Validators.required]],
      country: [mentee.country],
      description: [mentee.description],
      available: [mentee.available],
      skills: [''],
      id: [mentee.id]
    });
  }

  updateMentee() {
    const form = this.menteeFG;

    if (form.valid) {
      const mentee = new Mentee();

      mentee.id = this.menteeFG.value.id;
      mentee.name = this.menteeFG.value.name;
      mentee.country = this.menteeFG.value.country;
      mentee.description = this.menteeFG.value.description;
      mentee.available = this.menteeFG.value.available;
      mentee.skills = this.skills;

      this.dataService.updateMentee(mentee).subscribe((response: any) => {
        this.snackBar.open(`Mentee updated - ${mentee.name}`, 'Ok');
        this.router.navigate(['mentee']);
      });
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
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

    return this.allSkills.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
