import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';
import { ApiService } from '../api/api.service';
import { MoviesService } from '../movies/movies.service';
import { RepertoireService } from '../repertoire/repertoire.service';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RoomsService],
      imports: [HttpClientTestingModule],
    });
  });

  it('getRooms', done => {
    const expectedUrl = 'http://localhost:3000/rooms';
    const service = TestBed.inject(EnvironmentInjector).get(RoomsService);
    const httpController = TestBed.inject(HttpTestingController);

    service.getAllRooms().subscribe({
      next: res => {
        expect(res).toBeTruthy();
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({});
  });
});
