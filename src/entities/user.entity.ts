import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Project } from './project.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'tinyint',
    name: 'is_active',
    default: 1,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;
  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];
}
