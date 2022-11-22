import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-list-of-days',
  templateUrl: './list-of-days.component.html',
  styleUrls: ['./list-of-days.component.scss'],
})
export class ListOfDaysComponent implements OnInit {
  buttons = [
    {
      content: 'Dziś',
      date: moment().format('DD/MM/YYYY'),
    },
    {
      content: 'Jutro',
      date: this.getDateAfterXDays(1, 'long'),
    },
    {
      content: this.getDateAfterXDays(2, 'short'),
      date: this.getDateAfterXDays(2, 'long'),
    },
    {
      content: this.getDateAfterXDays(3, 'short'),
      date: this.getDateAfterXDays(3, 'long'),
    },
    {
      content: this.getDateAfterXDays(4, 'short'),
      date: this.getDateAfterXDays(4, 'long'),
    },
    {
      content: this.getDateAfterXDays(5, 'short'),
      date: this.getDateAfterXDays(5, 'long'),
    },
    {
      content: this.getDateAfterXDays(6, 'short'),
      date: this.getDateAfterXDays(6, 'long'),
    },
  ];

  constructor() {}
  ngOnInit(): void {}

  getDateAfterXDays(days: number, type: 'long' | 'short') {
    return moment()
      .locale('pl')
      .add(days, 'days')
      .format(type === 'long' ? 'DD/MM/YYYY' : 'DD/MM');
  }

  setDayToDisplay(e: Event, date: string) {
    const allButtons = document.querySelectorAll('.buttonsContainer__button');
    allButtons.forEach(button => button.classList.remove('active'));

    const target = e.target as HTMLButtonElement;
    target.classList.add('active');
  }
}
