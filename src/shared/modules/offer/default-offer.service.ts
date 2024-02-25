import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './index.js';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.js';
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

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find();
  }
}
