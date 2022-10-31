import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

@Entity({ name: 'articles' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
     title!: string

  @Column()
    content!: string

  @Column()
    views!: number

  @Column()
    createTime!: Date

  @Column()
    updateTime!: Date

  @Column()
    isDelete!: boolean

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: User
}
