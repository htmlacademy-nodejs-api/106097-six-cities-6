import { Ref, defaultClasses, modelOptions, prop } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: [5, 'Min length for offer name is 5'],
    maxlength: [1024, 'Max length for offer name is 1024'],
    trim: true,
  })
  public text: string;

  @prop({
    required: true,
  })
  public postDate: Date;

  @prop({
    required: true,
  })
  public rating: number;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author: Ref<UserEntity>;

  @prop({
    required: true,
    ref: OfferEntity,
  })
  public offer: Ref<OfferEntity>;
}

