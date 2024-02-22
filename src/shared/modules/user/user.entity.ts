import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    minlength: [1, 'Min length for user name is 1'],
    maxlength: [15, 'Max length for user name is 15'],
  })
  public name: string;

  @prop({
    required: true,
    unique: true,
  })
  public email: string;

  @prop({
    required: false,
    match: [/^(.*\.(jpg|png))$/, 'Avatar must be a JPG or PNG image'],
    default: '',
  })
  public avatarPath: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for user password is 6'],
    maxlength: [12, 'Max length for user password is 12'],
    default: '',
  })
  public password!: string;

  @prop({
    required: true,
  })
  public type: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath as string;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
