import { Component, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-flight-offer',
  templateUrl: './flight-offer.component.html',
  styleUrl: './flight-offer.component.scss',
})

export class FlightOfferComponent {
  @Input() flightOffer: any = {};
  @Input() showConfirmationButton: boolean = true;
  @Output() flightOfferConfirmationStatusEvent = new BehaviorSubject<string>(
    'not-confirmed'
  );
  @Output() confirmedFlightOffer = new Subject<any>();

  constructor(private readonly dataService: DataService) {}

  onConfirm(offer: any): void {
    this.flightOfferConfirmationStatusEvent.next('confirming');
    this.dataService.getFlightFinalPrice(offer).subscribe((response: any) => {
      this.flightOfferConfirmationStatusEvent.next('confirmed');
      this.confirmedFlightOffer.next(response);
    });
  }
}
