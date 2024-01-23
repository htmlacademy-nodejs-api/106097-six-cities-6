import { City } from './city.js';
import { Coordinates } from './coordinates.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  towns: City[];
  points: { [key:string]: Coordinates[] };
  previewImages: string[];
  types: string[];
  amenities: string[];
  authors: string[];
  emails: string[];
  avatars: string[];
  authorTypes: string[];
  passwords: string[];
  flag: string[];
}
