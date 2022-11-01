import {BaseEntity,Column, Entity, JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from'typeorm'
import { User } from './user'
// import { Comment } from './comment'
@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
    content!: string

  @Column()
    title!: string  

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

  // @OneToMany(() => Comment, (comment) => comment.article)
  // comments!: Comment[]
}
