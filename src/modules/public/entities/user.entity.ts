import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Role } from '../../tenanted/entities/role.entity';

@Entity({ name: 'user', schema: 'public' })
export class User extends AbstractEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'hashed_password' })
  hashedPassword: string;

  @Column({ name: 'generated_token', nullable: true })
  generatedToken: string;

  // @ManyToOne(() => Role)
  // @JoinColumn({ name: 'role_id' })
  // role: Role;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;
}
