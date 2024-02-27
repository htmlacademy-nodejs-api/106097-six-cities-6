import { Container } from 'inversify';
import { Component } from '../../types/component.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, DefaultOfferService, OfferService } from './index.js';
import { OfferModel } from '../models.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
