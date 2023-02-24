export interface FooterLink {
  name: string;
  link: string;
}

export interface Config {
  dayToDisplayOnInit: number;
  numberOfDaysToDisplay: number;
  footerLinks: FooterLink[];
}

export type ConfigState = Config;
