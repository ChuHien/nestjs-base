import { Category } from '../enums/category_enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'category',
    type: 'enum',
    default: Category.CLIENT,
    enum: Category,
  })
  category: string;

  @Column({
    name: 'projected_spend',
    type: 'int',
    default: 0,
  })
  projectedSpend: number;

  @Column({
    name: 'projected_variance',
    type: 'int',
    default: 0,
  })
  projectedVariance: number;

  @Column({
    name: 'revenue_recognised',
    type: 'int',
    default: 0,
  })
  revenueRecognised: number;

  @Column({
    name: 'project_started_at',
    type: 'datetime',
  })
  projectStartedAt: Date;

  @Column({
    name: 'project_ended_at',
    type: 'datetime',
    nullable: true,
  })
  projectEndedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_users',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
