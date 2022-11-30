export class HotelModel {
  address: { city: string; country: string; countryName: string; region: string };
  description: { short: string };
  hotelId: string;
  images: {
    altText: string | null;
    height: number;
    isHeroImage: boolean;
    url: string;
    width: number;
  }[];
  name: string;
  starRating: number;
  amenities: { code: number; formatted: string }[]; //facilities
  roomCount: number;
}

export class getHotels {
  params: {
    start?: string;
    end?: string;
    name?: { like: string };
    starRating?: { gte: number };
  };
}
