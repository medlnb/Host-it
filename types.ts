export interface PostType {
  _id: string;
  poster: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  city: {
    name: string;
    id: number;
  };
  state: {
    name: string;
    id: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  resevedDateFrom?: string[];
  resevedDateTo?: string[];
  description?: string;
  amenities: string[];
  image: {
    display_url: string;
    delete_url: string;
  }[];
}
