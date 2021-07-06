import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'elo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private translateService: TranslateService){
    this.translateService.setDefaultLang("ptBR");
    this.translateService.use("ptBR");
  }
}
