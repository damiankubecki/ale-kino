import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip, tap } from 'rxjs';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PurchaseService],
      imports: [HttpClientTestingModule],
    });
  });

  it('clearing order', done => {
    const service = TestBed.inject(EnvironmentInjector).get(PurchaseService);

    service.addSeat({
      row: 1,
      seat: 1,
      seatId: 1,
      ticketType: { id: 0, name: 'default', description: 'default ticket', price: 50 },
    });

    service.order$
      .pipe(
        skip(1),
        tap(order => {
          expect(order.reservedSeats.length).toEqual(0);
          done();
        })
      )
      .subscribe();

    service.clearOrder();
  });
  it('adding discount', done => {
    const service = TestBed.inject(EnvironmentInjector).get(PurchaseService);

    service.addDiscount({ id: 1, name: 'promocja', discount: 100 });

    service.order$
      .pipe(
        tap(order => {
          expect(order.discount).toBeTruthy();
          done();
        })
      )
      .subscribe();
  });
  it('sending order', done => {
    const expectedUrl = 'http://localhost:3000/orders';
    const service = TestBed.inject(EnvironmentInjector).get(PurchaseService);
    const httpController = TestBed.inject(HttpTestingController);

    service.sendOrder().subscribe({
      next: res => {
        expect(res).toBeTruthy();
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({});
  });
});
