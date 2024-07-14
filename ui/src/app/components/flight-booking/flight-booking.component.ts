import { Component, ViewChild, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { TravelerInfoComponent } from '../traveler-info/traveler-info.component';

@Component({
  selector: 'app-flight-search-booking',
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.scss',
})
export class FlightBookingComponent implements OnInit {
  private alertEvent = new Subject<string>();
  @ViewChild(TravelerInfoComponent)
  travelerInfoComponent!: TravelerInfoComponent;
  flightOffers: any[] = [];
  flightConfirmationStatus: string = '';
  successMessage?: string;
  flightBookingStatus: string = 'not-booked';
  selectedFlightOffer: any = {};

  constructor(private readonly dataService: DataService) {}

  onFlightOffersRefresh($event: any) {
    this.flightOffers = $event;
  }

  ngOnInit(): void {
    this.alertEvent.subscribe(message => (this.successMessage = message));
    this.alertEvent.pipe(debounceTime(5000)).subscribe(() => {
      this.successMessage = undefined;
      location.reload();
    });
  }

  onFlightOfferConfirmation(status: string) {
    this.flightConfirmationStatus = status;
  }

  onConfirmFlightOffer(offer: any): void {
    if (offer && offer.flightOffers && offer.flightOffers.length > 0)
      this.selectedFlightOffer = offer.flightOffers[0];
  }

  bookFlight(): void {
    this.flightBookingStatus = 'booking';
    const fligtBookPayload = {
      flightOffers: [this.selectedFlightOffer],
      travelers: [this.travelerInfoComponent.bookingForm.value],
    };
    this.dataService
      .createFlightOrder(fligtBookPayload)
      .subscribe((response: any) => {
        this.alertEvent.next(
          `Flight booked successfully and booking reference is ${response.associatedRecords[0].reference}`
        );
        this.flightBookingStatus = 'booked';
      });
  }
}
