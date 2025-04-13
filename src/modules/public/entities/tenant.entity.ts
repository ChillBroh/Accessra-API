import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'tenant'})
export class Tenant extends AbstractEntity{
  @Column('text',{unique:true})
  name: string

  @Column('text',{unique:true})
  schemaName:string
}
