import { City } from './city.js';
import { Coordinates } from './coordinates.type.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  postDate: Date;
  town: City;
  previewPath: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  amenities: string[];
  author: User;
  comments: number;
  coordinates: Coordinates;
}
