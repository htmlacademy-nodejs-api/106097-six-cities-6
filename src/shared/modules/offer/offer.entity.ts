import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, Offer } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({
    required: true,
    minlength: [10, 'Min length for offer name is 10'],
    maxlength: [100, 'Max length for offer name is 100'],
    trim: true,
  })
  public name!: string;

  @prop({
    required: true,
    minlength: [20, 'Min length for offer description is 20'],
    maxlength: [1024, 'Max length for offer description is 1024'],
    trim: true,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true,
  })
  public town!: City;

  @prop({
    required: true,
  })
  public previewPath!: string;

  @prop({
    required: true,
    type: () => [String],
  })
  public photos!: string[];

  @prop({
    required: true,
  })
  public premium!: boolean;

  @prop({
    required: true,
    default: false,
  })
  public favorite!: boolean;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
  })
  public type!: string;

  @prop({
    required: true,
  })
  public rooms!: number;

  @prop({
    required: true,
  })
  public guests!: number;

  @prop({
    required: true,
  })
  public price!: number;

  @prop({
    required: true,
    default: [],
    type: () => [String],
  })
  public amenities!: string[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author!: UserEntity;

  @prop({
    default: 0,
  })
  public commentCount: number;

  @prop({
    required: true,
  })
  public latitude!: number;

  @prop({
    required: true,
  })
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
