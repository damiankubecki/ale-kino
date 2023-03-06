import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { skip } from 'rxjs';
import { TopbarService } from './topbar.service';

describe('TopbarService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TopbarService],
      imports: [RouterModule],
    });
  });

  it('setting topbar content', done => {
    const service = TestBed.inject(EnvironmentInjector).get(TopbarService);

    service.topbarContent$.pipe(skip(1)).subscribe(content => {
      expect(content).not.toBeFalsy();
      done();
    });

    service.setTopbarContent('Example');
  });
});
