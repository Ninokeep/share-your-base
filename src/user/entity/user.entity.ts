import { BaseEntity } from '../../base/entity/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  draftBase: number;

  @OneToMany(() => BaseEntity, (base) => base.user)
  bases: BaseEntity[];
}
