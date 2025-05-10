import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { DeploySchedule } from "./DeploySchedule";

@Entity("repositories")
export class Repository {
  @PrimaryGeneratedColumn("uuid")
  external_id: string;

  @Column()
  user_id: string;

  @Column()
  github_repo: string;

  @Column()
  branch_homolog: string;

  @Column()
  branch_production: string;

  @Column({ nullable: true })
  slack_channel_id: string;

  @ManyToOne(() => User, user => user.repositories)
  @JoinColumn({ name: "user_exteral_id" })
  user: User;

  @OneToMany(() => DeploySchedule, deploySchedule => deploySchedule.repository)
  deploySchedules: DeploySchedule[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}