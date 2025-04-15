import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'resources', schema: 'public' })
export class Resource extends  AbstractEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  code: string;
}
