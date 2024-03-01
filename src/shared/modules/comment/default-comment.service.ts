import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.js';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

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
