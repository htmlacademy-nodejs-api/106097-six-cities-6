import { City } from '../../../types/city.js';
import { User } from '../../../types/user.type.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public postDate: Date;
  public town: City;
  public previewPath: string;
  public photos: string[];
  public premium: boolean;
  public favorite: boolean;
  public rating: number;
  public type: string;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: string[];
  public author: User;
  public commentCount: number;
  public latitude: number;
  public longitude: number;
}
