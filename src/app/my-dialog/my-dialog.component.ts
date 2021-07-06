import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeopleService } from '../services/people.service';

export interface DialogData {
  id: number;
  title: string;
  description: string;
  fnc: any;
}

@Component({
  selector: 'elo-my-dialog',
  templateUrl: './my-dialog.component.html'
})
export class MyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private peopleService: PeopleService) {}
}
