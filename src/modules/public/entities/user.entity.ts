import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Tenant } from './tenant.entity';

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

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;
}
