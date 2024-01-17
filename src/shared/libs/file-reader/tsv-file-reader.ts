import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.js';
import { CITIES } from '../../types/city.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor (
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, postDate, town, previewPath, photos, premium, favorite, rating, type, rooms, guests, price, amenities, authorName, authorEmail, authorAvatar, authorPassword, authorType, comments, latitude, longitude]) => ({
        name: name,
        description: description,
        postDate: new Date(postDate),
        town: town as keyof typeof CITIES,
        previewPath: previewPath,
        photos: photos.split(';'),
        premium: Boolean(premium),
        favorite: Boolean(favorite),
        rating: Number.parseInt(rating, 10),
        type: type,
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        amenities: amenities.split(';'),
        author: { name: authorName, email: authorEmail, avatarPath: authorAvatar, password: authorPassword, type: authorType },
        comments: Number.parseInt(comments, 10),
        coordinates: { latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude) },
      }));
  }
}
