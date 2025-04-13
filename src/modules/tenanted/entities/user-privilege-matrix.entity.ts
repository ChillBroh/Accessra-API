import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../../../abstract.entity";
import { Role } from "./role.entity";

@Entity({ name: 'user_privilege_matrix' })
export class UserPrivilegeMatrix extends AbstractEntity {
  @Column('uuid')
  userId: string;

  @Column('uuid')
  roleId: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
