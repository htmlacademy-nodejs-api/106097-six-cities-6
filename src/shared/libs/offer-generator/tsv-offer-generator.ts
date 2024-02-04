import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomItem } from '../../helpers/common.js';
import { generateRandomValue } from '../../helpers/common.js';
import { getRandomItems } from '../../helpers/common.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 21;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator{
  constructor(private readonly mockData: MockServerData) {}

  public generate():string {
    const name = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const town = getRandomItem(this.mockData.towns);
    const previewPath = getRandomItem(this.mockData.previewImages);
    const photos = this.mockData.previewImages;
    const premium = getRandomItem(this.mockData.flag);
    const favorite = getRandomItem(this.mockData.flag);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS, 0).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS, 0).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE, 0).toString();
    const amenities = getRandomItems(this.mockData.amenities);
    const author = getRandomItem(this.mockData.authors);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS, 0).toString();
    const coordinates = getRandomItem(this.mockData.points[town]);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;

    return [
      name,
      description,
      postDate,
      town,
      previewPath,
      photos,
      premium,
      favorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      author,
      comments,
      latitude,
      longitude,
    ].join('\t');
  }
}
