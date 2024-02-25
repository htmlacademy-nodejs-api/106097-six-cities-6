import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, DEFAULT_OFFER_COUNT, updateOfferDto, DEFAULT_PREMIUM_OFFER_COUNT } from './index.js';
import { OfferEntity } from './offer.entity.js';
import { Component, City, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
    .findById(offerId)
    .populate(['author'])
    .exec();
  }

  public async updateById(offerId: string, dto: updateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['author'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
    .find()
    .limit(limit)
    .sort({postDate: SortType.Down})
    .populate(['author'])
    .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }})
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremium(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({town: city, premium: true}, {}, {DEFAULT_PREMIUM_OFFER_COUNT})
      .sort({postDate: SortType.Down})
      .populate(['author'])
      .exec();
  }
}
