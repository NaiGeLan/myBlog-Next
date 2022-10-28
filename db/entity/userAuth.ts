import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'
@Entity({ name: 'userAuth' })
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  identityType!: string

  @Column()
  credential!: string

  @Column()
  identifier!: string

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: User
}
