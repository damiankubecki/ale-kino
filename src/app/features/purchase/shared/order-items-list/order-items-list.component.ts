import { Component, inject } from '@angular/core';
import { icons } from '@app/shared/assets/icons';
import { ITicketType, TicketsService } from '@app/shared/data/tickets/tickets.service';
import { Observable } from 'rxjs';
import { IOrderInProgress, PurchaseService } from '../../purchase.service';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  private ticketsServcie = inject(TicketsService);
  private purchaseService = inject(PurchaseService);

  order$!: Observable<IOrderInProgress>;
  ticketsTypes: ITicketType[] = [];
  trashIcon = icons.trash;

  constructor() {
    this.ticketsServcie.ticketsTypes$.subscribe(value => {
      this.ticketsTypes = value;
    });

    this.order$ = this.purchaseService.order$;
  }

  handleTicketTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const seatId = Number(target.selectedOptions.item(0)?.dataset['seatid']);
    const selectedTicketName = target.value;

    const selectedTicket = this.ticketsTypes.find(ticket => ticket.name === selectedTicketName);
    if (!selectedTicket) return;

    this.purchaseService.setTicketType(seatId, selectedTicket);
  }

  handleTrashClick(seatId: number) {
    this.purchaseService.removeSeat(seatId);
  }
}
