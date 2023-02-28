import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';
import { TopbarContent, TopbarService } from './topbar.service';

describe('TopbarService', () => {
  it('setting topbar content', done => {
    const service = TestBed.inject(EnvironmentInjector).get(TopbarService);

    let value: TopbarContent = null;

    service.topbarContent$.pipe(skip(1)).subscribe(content => {
      value = content;
      done();
    });

    service.setTopbarContent('Example');

    expect(value).not.toBeFalsy();
  });
});
