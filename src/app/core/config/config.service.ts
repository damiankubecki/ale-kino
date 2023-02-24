import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, CONFIG_ENDPOINT } from '@app/shared/data/api/api';
import { Config, FooterLink } from './config.interface';
import { config, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);

  getConfig() {
    return this.http.get<Config>(`${API_URL}/${CONFIG_ENDPOINT}`);
  }

  setDayToDisplayOnInit(day: number) {
    return this.http.patch<Config>(`${API_URL}/${CONFIG_ENDPOINT}`, { dayToDisplayOnInit: day });
  }

  setNumberOfDaysToDisplay(value: number) {
    return this.http.patch<Config>(`${API_URL}/${CONFIG_ENDPOINT}`, {
      numberOfDaysToDisplay: value,
    });
  }

  addFooterLink(link: FooterLink) {
    return this.http.get<Config>(`${API_URL}/${CONFIG_ENDPOINT}`).pipe(
      switchMap(config => {
        return this.http.patch<Config>(`${API_URL}/${CONFIG_ENDPOINT}`, {
          footerLinks: [...config.footerLinks, link],
        });
      })
    );
  }

  deleteFooterLink(name: string) {
    return this.http.get<Config>(`${API_URL}/${CONFIG_ENDPOINT}`).pipe(
      switchMap(config => {
        return this.http.patch<Config>(`${API_URL}/${CONFIG_ENDPOINT}`, {
          footerLinks: config.footerLinks.filter(link => link.name !== name),
        });
      })
    );
  }
}
