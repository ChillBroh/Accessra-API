import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Role } from './role.entity';
import { Resource } from '../../public/entities/resource.entity';

@Entity({ name: 'user_privilege_matrix' })
export class UserPrivilegeMatrix extends AbstractEntity {
  @Column('uuid')
  roleId: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  resourceId: string;

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resourceId' })
  resource: Resource;

  @Column({ type: 'boolean', default: false })
  create: boolean;

  @Column({ type: 'boolean', default: false })
  edit: boolean;

  @Column({ type: 'boolean', default: false })
  delete: boolean;

  @Column({ type: 'boolean', default: false })
  update: boolean;
}
