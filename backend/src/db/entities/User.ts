import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Repository } from "./Repository";
import {SlackChannel} from './SlackChannel'

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  external_id: string;

  @Column({ nullable: true })
  github_token: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Repository, repository => repository.user)
  repositories: Repository[];

  @OneToMany(()=> SlackChannel, slackChannel => slackChannel.user)
  slackChannels: SlackChannel[];
}