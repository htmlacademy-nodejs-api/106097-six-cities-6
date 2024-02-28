import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.js';
import { types } from '@typegoose/typegoose';
import { CreateCommentDto, CommentEntity, CommentService } from './index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<types.DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('author');
  }

  public async findByOfferId(offerId: string): Promise<types.DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('author')
      .exec();
  }
}
