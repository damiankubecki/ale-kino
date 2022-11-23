import { Component, OnInit } from '@angular/core';
import { RepertoireService } from '@app/services/repertoire/repertoire.service';
import * as moment from 'moment';

interface IButton {
  content: string;
  date: string;
}

@Component({
  selector: 'app-list-of-days',
  templateUrl: './list-of-days.component.html',
  styleUrls: ['./list-of-days.component.scss'],
})
export class ListOfDaysComponent implements OnInit {
  buttons: IButton[] = [
    { content: 'Dziś', date: moment().format('DD/MM/YYYY') },
    { content: 'Jutro', date: this.getDateAfterXDays(1, 'long') },
  ];

  constructor(public RepertoireService: RepertoireService) {
    for (let i = 2; i <= this.RepertoireService.NUMBER_OF_DAYS_TO_DISPLAY - 1; i++) {
      this.buttons[i] = {
        content: this.getDateAfterXDays(i, 'short'),
        date: this.getDateAfterXDays(i, 'long'),
      };
    }
  }
  ngOnInit(): void {}
  // ngOnChanges(): void {
  //   console.log('dziala');
  // }

  private getDateAfterXDays(days: number, type: 'long' | 'short') {
    return moment()
      .locale('pl')
      .add(days, 'days')
      .format(type === 'long' ? 'DD/MM/YYYY' : 'DD/MM');
  }
}
