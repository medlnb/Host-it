export interface PostType {
  _id: string;
  poster: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  city: number;
  state: number;
  location: {
    lat: number;
    lng: number;
  };
  resevedDateFrom?: string[];
  resevedDateTo?: string[];
  description?: string;
  amenities: string[];
  images: string[];
}
