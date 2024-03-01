import { CITIES } from '../types/city.js';
import { Offer } from '../types/offer.type.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    postDate,
    town,
    previewPath,
    photos,
    premium,
    rating,
    type,
    rooms,
    guests,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    commentCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    name: authorName,
    email: authorEmail,
    avatarPath: authorAvatar,
    password: authorPassword,
    type: authorType,
  };

  return {
    name,
    description,
    postDate: new Date(postDate),
    town: town as keyof typeof CITIES,
    previewPath,
    photos: photos.split(';'),
    premium: premium === 'true',
    rating: Number.parseFloat(rating),
    type,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';'),
    commentCount: Number.parseInt(commentCount, 10),
    author,
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
