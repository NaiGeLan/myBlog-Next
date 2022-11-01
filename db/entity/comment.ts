import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Article } from './article'
import { User } from './user'

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  content!: string;

  @Column()
  createTime!: Date;

  @Column()
  updateTime!: Date;

  @ManyToOne(() => User)
  @JoinColumn({name: 'userId'})
  user!: User;

  @ManyToOne(() => Article, (article) => article.comments, {
    cascade: true,
  })
  @JoinColumn({name: 'articleId'})
  article!: Article;
}
