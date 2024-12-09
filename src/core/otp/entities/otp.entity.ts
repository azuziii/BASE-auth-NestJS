import { Base } from 'src/shared/base/base.entity';
import { User } from 'src/user/entities/user.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('otp')
export class Otp extends Base {
  @Column({ nullable: false, type: 'text' })
  otp!: string;

  @Column({ nullable: false, type: 'text' })
  ip!: string;

  @Column({ nullable: false, type: 'text' })
  user_agent!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ type: 'bool', default: false })
  is_used: boolean;

  @Column({ nullable: false, type: 'timestamptz' })
  expires_at!: Date;

  @BeforeInsert()
  setExpirationDate() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    this.expires_at = now;
  }

  isExpired() {
    const now = new Date();
    return now.getTime() > this.expires_at.getTime();
  }
}
