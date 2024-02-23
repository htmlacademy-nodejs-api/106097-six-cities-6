import { City, User } from './index.js';

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
  commentCount: number;
  latitude: number;
  longitude: number;
}
