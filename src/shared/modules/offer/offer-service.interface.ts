import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity, updateOfferDto } from './index.js';
import { City } from '../../types/city.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: updateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: City): Promise<DocumentType<OfferEntity>[]>
  addToFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
