import { Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'user', schema: ' public' })
export class User extends AbstractEntity{}
