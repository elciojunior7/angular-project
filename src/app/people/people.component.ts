import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '../models/person';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { PeopleService } from '../services/people.service';


@Component({
  selector: 'elo-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {

  public formFilter!: FormGroup;
  offset: number = 0;
  limit: number = 5;
  people: Array<Person>;
  loading: boolean;
  pageSize: number;
  page: number = 1;
  collectionSize: number;

  get name(): AbstractControl | null { return this.formFilter.get('name'); }
  get cpf(): AbstractControl | null { return this.formFilter.get('cpf'); }

  constructor(private dialog: MatDialog, public peopleService: PeopleService, private router: Router) { 
    this.formFilter = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.minLength(2) ],
        updateOn: 'blur'
      }),
      cpf: new FormControl('', {
        validators: [ Validators.minLength(3), Validators.maxLength(11) ],
        updateOn: 'blur',
      })
    })
  }

  ngOnInit(): void {

    this.search();
  }

  edit(id: number): void{
    let route = `/add-person/${id}`
    this.router.navigate([route]);
  }

  prepareToRemove(id: number, name: string): void{
    console.log(id)
    console.log(name)
    let desc = `Deseja realmente remover esta pessoa: ${name} ? Todos os contatos também serão apagados.`;
    let title = `Remover Pessoa`;
    this.dialog.open(MyDialogComponent, { data: {id: id, title: title, description: desc, fnc: this.remove}} );
  }

  remove(id: number): void{
    this.loading = true;
    this.peopleService.delete(id).subscribe(ok => {
      this.loading = false;
      this.router.navigate(["/"]);
    });
  }

  search(){
    this.loading = true;
    this.offset = this.page - 1;
    this.peopleService.list(this.offset.toString(), this.limit.toString(), this.name.value, this.cpf.value).subscribe(pageable => {
      this.people = pageable.content;
      this.pageSize = pageable.numberOfElements;
      this.page = pageable.pageNumber + 1;
      this.collectionSize = pageable.totalElements;
      this.loading = false;
    });
  }

}