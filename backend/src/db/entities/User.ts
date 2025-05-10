import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Repository } from "./Repository";
import {SlackChannel} from './SlackChannel'

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  external_id: string;

  @Column({unique: true})
  full_name: string;

  @Column({ nullable: true })
  github_token: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Repository, repository => repository.user)
  repositories: Repository[];

  @OneToMany(()=> SlackChannel, slackChannel => slackChannel.user)
  slackChannels: SlackChannel[];
}