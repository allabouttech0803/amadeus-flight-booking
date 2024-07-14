import { Injectable } from '@nestjs/common';
import * as Amadeus from 'amadeus';

@Injectable()
export class AmadeusService {
  private readonly amadeusClient: Amadeus;

  constructor() {
    const clientId = process.env.AMADEUS_CLIENT_ID ?? 'default_client_id';
    const clientSecret =
      process.env.AMADEUS_CLIENT_SECRET ?? 'default_client_secret';
    this.amadeusClient = new Amadeus({ clientId, clientSecret });
  }

  /**
   * This method fetches locations based on the keyword provided
   * @param keyword The keyword to search for locations
   * @returns
   */
  async getReferenceDataLocations(keyword: string): Promise<any> {
    try {
      const response = await this.amadeusClient.referenceData.locations.get({
        keyword,
        subType: Amadeus.location.city,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error while fetching locations and error is ${error.message}`,
      );
    }
  }

  /**
   * This method fetches flight offers for a given origin and destination location code
   * @param originLocationCode The IATA location code from which the flight will depart
   * @param destinationLocationCode The IATA location code to which the flight will arrive
   * @param departureDate Departure date in the format YYYY-MM-DD
   * @param adults Optional number of adults traveling
   * @returns
   */
  async getFlightOffersSearch(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: number = 1,
  ): Promise<any> {
    try {
      const response = await this.amadeusClient.shopping.flightOffersSearch.get(
        {
          originLocationCode,
          destinationLocationCode,
          departureDate,
          adults,
        },
      );
      return response.data;
    } catch (responseError) {
      console.error(responseError);
      throw responseError;
    }
  }

  /**
   * This method fetches the final price for a given flight offer
   * @param offerPriceBody
   * @returns
   */
  async getFlightOfferFinalPrice(offerPriceBody: any): Promise<any> {
    try {
      const response =
        await this.amadeusClient.shopping.flightOffers.pricing.post(
          JSON.stringify({
            data: {
              type: 'flight-offers-pricing',
              flightOffers: [offerPriceBody['flightOffers']],
            },
          }),
        );
      return response.data;
    } catch (responseError) {
      console.error(responseError);
      throw responseError;
    }
  }

  /**
   * This method creates a flight order
   * @param orderBody
   * @returns
   */
  async createFlightOrder(orderBody: any): Promise<any> {
    try {
      const response = await this.amadeusClient.booking.flightOrders.post(
        JSON.stringify({
          data: {
            type: 'flight-order',
            flightOffers: orderBody['flightOffers'],
            travelers: orderBody['travelers'],
            /* Replace this information with actual user payment details */
            payment: {
              method: 'credit-card',
              creditCard: {
                vendorCode: 'VI',
                cardNumber: '4111111111111111',
                expiryDate: '2023-01',
              },
            },
          },
        }),
      );
      return response.data;
    } catch (responseError) {
      console.error(responseError);
      throw responseError;
    }
  }
}
