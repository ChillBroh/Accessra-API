import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @Column('text', { unique: true })
  name: string;
}
