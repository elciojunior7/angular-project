import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'elo-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.sass']
})
export class AddPersonComponent implements OnInit {

  public formSave!: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  person: Person;
  idPerson: number;
  isSaveOk: boolean = false;
  errorMsg?: string;

  get name(): AbstractControl | null { return this.formSave.get('name'); }
  get cpf(): AbstractControl | null { return this.formSave.get('cpf'); }
  get birthDate(): AbstractControl | null { return this.formSave.get('birthDate'); }

  constructor(private dialog: MatDialog, private peopleService: PeopleService, private route: ActivatedRoute) { 
    this.maxDate = new Date();
    this.formSave = new FormGroup({
      name: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(2) ],
        updateOn: 'blur'
      }),
      cpf: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(11) ],
        updateOn: 'blur',
      }),
      birthDate: new FormControl('', {
        validators: [ Validators.required ],
        updateOn: 'blur',
      }),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPerson = params.id;
      if(this.idPerson){
        this.peopleService.getById(this.idPerson).subscribe(person => {
          this.idPerson = person.id;
          this.name.setValue(person.name);
          this.cpf.setValue(person.cpf);
          this.birthDate.setValue(new Date(parseInt(person.birthDate)));
        });
      }
    });
  }

  save(): void {
    Object.entries(this.formSave.controls).forEach(([key]) => {
      this.formSave.controls[key].markAsTouched();
    });
    this.isSaveOk = false;
    this.errorMsg = undefined;
    if(this.formSave.valid){
      this.loading = true;
      this.person = new Person();
      this.person.cpf = this.cpf.value;
      if(this.birthDate && this.birthDate.value instanceof Date)
        this.person.birthDate = this.birthDate.value.getTime().toString();
      this.person.name = this.name.value;
      if(this.idPerson){
        this.person.id = this.idPerson;
        this.peopleService.update(this.person).subscribe(person => {
          this.loading = false;
          if(person)
            this.isSaveOk = true;
        },
        err => {
          this.loading = false;
          this.errorMsg = err.message;
        });
      }else{
        this.peopleService.create(this.person).subscribe(person => {
          this.loading = false;
          if(person)
            this.isSaveOk = true;
        },
        err => {
          this.loading = false;
          this.errorMsg = err.message;
        });
      }
    }
  }
  
}
