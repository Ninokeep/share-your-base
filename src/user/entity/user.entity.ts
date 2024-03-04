import { BaseEntity } from '../../base/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../model/user-role.enum';

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

  @Column({ default: 1 })
  draftBase: number;

  @Column({ default: 'user', enum: UserRole })
  role: string;

  @Column({ default: false, enum: [false, true] })
  disabled: boolean;

  @OneToMany(() => BaseEntity, (base) => base.user)
  bases: BaseEntity[];
}
