import { City } from './city.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  postDate: Date;
  town: City;
  previewPath: string;
  photos: string[];
  premium: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  amenities: string[];
  author: User;
  commentCount: number;
  latitude: number;
  longitude: number;
}
