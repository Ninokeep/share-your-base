import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseType } from '../utils/enum/base-type.enum';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  costWood: number;

  @Column()
  costStone: number;

  @Column()
  costMetal: number;

  @Column()
  costHQ: number;

  @Column()
  costWoodPerHour: number;

  @Column()
  costStonePerHour: number;

  @Column()
  costMetalPerHour: number;

  @Column()
  costHQPerHour: number;

  @Column({ enum: BaseType })
  type: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.bases, { nullable: false })
  users: UserEntity;
}
