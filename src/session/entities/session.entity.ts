import { Base } from 'src/shared/base/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('session')
export class Session extends Base {
  @Column({ nullable: false, type: 'text', unique: true })
  session_token!: string;

  @Column({ nullable: false, type: 'timestamptz' })
  expires_at!: Date;

  @Column({ nullable: false, type: 'text' })
  ip!: string;

  @Column({ nullable: false, type: 'text' })
  user_agent!: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user!: User;

  isActive() {
    const now = new Date();
    return now <= this.expires_at;
  }

  invalidate() {
    this.expires_at = new Date();
  }
}
