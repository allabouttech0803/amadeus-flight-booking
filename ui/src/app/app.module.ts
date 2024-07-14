import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  DfAdvancedInputModule,
  DfAlertModule,
  DfDatePickerModule,
  DfInputIconDirective,
  DfSelectModule,
} from '@design-factory/design-factory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AirportSelectionComponent } from './components/airport-selection/airport-selection.component';
import { FlightOfferComponent } from './components/flight-offer/flight-offer.component';
import { TravelerInfoComponent } from './components/traveler-info/traveler-info.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightBookingComponent,
    AirportSelectionComponent,
    FlightOfferComponent,
    TravelerInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    DfInputIconDirective,
    DfAdvancedInputModule,
    DfAlertModule,
    DfSelectModule,
    DfDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
