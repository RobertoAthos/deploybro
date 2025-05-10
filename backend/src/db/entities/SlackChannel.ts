import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("slack_channels")
export class SlackChannel {
  @PrimaryGeneratedColumn("uuid")
  external_id: string;

  @Column()
  channel_name: string;

  @Column()
  channel_id: string;

  @ManyToOne(() => User, user => user.repositories)
  @JoinColumn({ name: "user_exteral_id" })
  user: User;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}