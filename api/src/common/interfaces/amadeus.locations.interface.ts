interface Location {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset?: string;
  iataCode?: string;
  geoCode?: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode?: string;
    countryName: string;
    countryCode: string;
    stateCode?: string;
    regionCode: string;
  };
  analytics?: {
    travelers?: {
      score: number;
    };
  };
}

interface Meta {
  count: number;
  links: {
    self: string;
  };
}

export interface AmadeusLocation {
  meta: Meta;
  data: Location[];
}
