import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { Repository } from "./Repository";
import { DeployStatus } from "../../types/deployStatusOptions";

@Entity("deploy_schedules")
export class DeploySchedule {
  @PrimaryGeneratedColumn("uuid")
  external_id: string;

  @Column()
  repo_id: string;

  @Column()
  branch: string;

  @Column()
  scheduled_for: Date;

  @Column({ nullable: true })
  message: string;

  @Column({
    type: "enum",
    enum: DeployStatus,
    default: DeployStatus.PENDING
  })
  status: DeployStatus;

  @Column({ nullable: true })
  github_run_url: string;

  @Column({ nullable: true })
  aws_console_url: string;

  @ManyToOne(() => Repository, repository => repository.deploySchedules)
  @JoinColumn({ name: "repo_external_id" })
  repository: Repository;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}