import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PurchaseService],
      imports: [HttpClientTestingModule],
    });
  });

  it('clear order', done => {
    const service = TestBed.inject(EnvironmentInjector).get(PurchaseService);

    service.addSeat({
      row: 1,
      seat: 1,
      seatId: 1,
      ticketType: { id: 0, name: 'default', description: 'default ticket', price: 50 },
    });

    service.order$.pipe(skip(1)).subscribe(order => {
      expect(order.reservedSeats.length).toEqual(0);
      done();
    });

    service.clearOrder();
  });
});
