import { Component, Output } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent {
  searchedText$: Subject<any> = new Subject<any>();
  selectedAirport: any[] = [];
  airportsData: any[] = [];
  airportsCityData: any[] = [];
  selectedAirportTemplate: any[] = [];
  groupByFn = (item: any) => item.address.countryName;
  groupValueFn = (groupName: any) =>
    this.airportsData.filter(
      (item: any) => groupName === item.address.countryName
    )[0];
  sourceAirport: any = '';
  destinationAirport: any = '';

  fromDate: NgbDate | null = new NgbDate(2021, 1, 1);
  toDate: NgbDate | null = new NgbDate(2021, 1, 1);
  hoveredDate: NgbDate | null = null;
  startDate: NgbDate | null = null;
  flightOffers: any[] = [];
  isLoading = false;
  @Output() flightOffersEvent = new BehaviorSubject<any[]>([]);

  constructor(
    private readonly dataService: DataService,
    public formatter: NgbDateParserFormatter,
    private readonly dpConfig: NgbDatepickerConfig,
    private calendar: NgbCalendar
  ) {
    this.searchedText$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(term => this.dataService.getAmadeusLocation(term))
      )
      .subscribe((data: any) => (this.airportsData = data));
  }

  isIndeterminate(items: {
    selected: any;
    children: {
      length: any;
      filter: (arg0: (x: any) => any) => { (): any; new (): any; length: any };
    };
  }) {
    if (items.selected) {
      return false;
    }
    if (items.children) {
      const childrenCount = items.children.length;
      const selectedCount = items.children.filter(x => x.selected).length;
      return selectedCount > 0 && childrenCount > selectedCount;
    }
    return false;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      (date.equals(this.fromDate) || date.after(this.fromDate))
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isSelected(date: NgbDate): boolean {
    return date.equals(this.fromDate) || date.equals(this.toDate);
  }

  isFrom(date: NgbDate): boolean {
    return date.equals(this.fromDate) && !date.equals(this.toDate);
  }

  isTo(date: NgbDate): boolean {
    const toDate = this.effectiveToDate();
    return !date.equals(this.fromDate) && date.equals(toDate);
  }

  isBetween(date: NgbDate): boolean {
    const toDate = this.effectiveToDate();
    return date.after(this.fromDate) && date.before(toDate);
  }

  effectiveToDate(): NgbDate | null {
    return !this.toDate && this.hoveredDate ? this.hoveredDate : this.toDate;
  }

  parseInput(previous: NgbDate | null, typed: string): NgbDate | null {
    const parsed = this.formatter.parse(typed);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : previous;
  }

  toggle(date: NgbDate | null, dppop: NgbInputDatepicker) {
    this.startDate = date;
    dppop.toggle();
  }

  getNgbDpStartDate(startDate: NgbDate | null): {
    year: number;
    month: number;
    day?: number;
  } {
    if (startDate !== null) {
      return {
        year: startDate.year,
        month: startDate.month,
        day: startDate.day,
      };
    }
    return this.dpConfig.startDate;
  }

  searchFlights() {
    this.isLoading = true;
    this.flightOffersEvent.next([]);
    const { sourceAirport, destinationAirport, fromDate } = this;
    const params = {
      originLocationCode: sourceAirport,
      destinationLocationCode: destinationAirport,
      departureDate: this.formatter.format(fromDate),
      adults: 1,
      children: 0,
      infants: 0,
    };
    this.dataService.getFlightOffers(params).subscribe({
      next: (data: any) => {
        this.flightOffers = data;
        this.flightOffersEvent.next(data);
      },
      error: (error: any) => {
        console.error('Error fetching flight offers:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  setSourceAirport(selectedAirport: any) {
    this.sourceAirport = selectedAirport;
  }

  setDestinationAirport(selectedAirport: any) {
    this.destinationAirport = selectedAirport;
  }
}
