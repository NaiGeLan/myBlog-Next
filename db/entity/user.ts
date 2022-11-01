import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Article } from './article'
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  nickname!: string

  @Column()
  avatar!: string

  @Column()
  job!: string

  @Column()
  introduce!: string

  @OneToMany(() => Article, (article) => article.user)
  articles!: Article[]
}
