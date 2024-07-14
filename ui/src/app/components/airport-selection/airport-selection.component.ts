import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-airport-selection',
  templateUrl: './airport-selection.component.html',
  styleUrls: ['./airport-selection.component.scss'],
})
export class AirportSelectionComponent {
  @Input() selectId: string = '';
  @Input() label: string = '';
  @Input() airportsData: any[] = [];
  @Input() searchedText$: Subject<any> = new Subject<any>();
  @Input() selectedAirportTemplate: any[] = [];
  @Input() groupByFn: any;
  @Input() groupValueFn: any;
  @Output() airportSelected = new EventEmitter<any>();

  constructor() {}

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
  onSelectionChange(event: any) {
    if (event.iataCode) {
      this.airportSelected.emit(event.iataCode);
    }
  }
}
