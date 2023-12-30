import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseType } from '../utils/enum/base-type.enum';
import { UserEntity } from 'src/user/entity/user.entity';

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
  costMetalWoodPerHour: number;

  @Column()
  costHQPerHour: number;

  @Column({ enum: BaseType })
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.bases, { nullable: false })
  user: UserEntity;
}
