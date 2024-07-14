import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-traveler-info',
  templateUrl: './traveler-info.component.html',
  styleUrl: './traveler-info.component.scss',
})
export class TravelerInfoComponent implements OnInit {
  bookingForm!: FormGroup;
  @Input() flightOffers: any[] = [];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      id: [1, Validators.required],
      dateOfBirth: ['', Validators.required],
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      gender: ['MALE', Validators.required],
      contact: this.fb.group({
        emailAddress: ['', [Validators.required, Validators.email]],
        phones: this.fb.array([
          this.fb.group({
            deviceType: ['MOBILE', Validators.required],
            countryCallingCode: ['', Validators.required],
            number: ['', Validators.required],
          }),
        ]),
      }),
      documents: this.fb.array([
        this.fb.group({
          documentType: ['PASSPORT', Validators.required],
          birthPlace: ['', Validators.required],
          issuanceLocation: ['', Validators.required],
          issuanceDate: ['', Validators.required],
          number: ['', Validators.required],
          expiryDate: ['', Validators.required],
          issuanceCountry: ['', Validators.required],
          validityCountry: ['', Validators.required],
          nationality: ['', Validators.required],
          holder: [true, Validators.required],
        }),
      ]),
    });
  }

  get documents(): FormArray {
    return this.bookingForm.get('documents') as FormArray;
  }

  get contactDetails(): FormArray {
    return this.bookingForm.get('contact.phones') as FormArray;
  }
}
