import 'reflect-metadata';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/component.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
