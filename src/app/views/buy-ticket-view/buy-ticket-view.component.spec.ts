import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketViewComponent } from './buy-ticket-view.component';

describe('BuyTicketViewComponent', () => {
  let component: BuyTicketViewComponent;
  let fixture: ComponentFixture<BuyTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyTicketViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
