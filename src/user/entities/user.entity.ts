import { Base } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AccountStatus } from '../enum/account_status.enum';
import { ProfileVisibility } from '../enum/profile_visibility.enum';
import { UserRole } from '../enum/user_role.enum';
import { Session } from 'src/session/entities/session.entity';

@Entity('user')
export class User extends Base {
  @Column({ type: 'varchar', length: 16, unique: true, nullable: false })
  username!: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 60, unique: true, nullable: false })
  password!: string;

  @Column({
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
    nullable: false,
  })
  account_status!: AccountStatus;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  //   @Column({ nullable: false, type: 'text' })
  //   recovery_passket!: string;

  @Column({
    enum: ProfileVisibility,
    default: ProfileVisibility.PUBLIC,
    nullable: false,
  })
  profile_visibility!: ProfileVisibility;

  @Column({
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role!: UserRole;

  @Column({ type: 'timestamptz', default: null })
  last_online: Date;

  @Column({ type: 'text', default: '' })
  bio!: string;

  @Column({ type: 'text', default: '' })
  profile_picture!: string;

  //   @OneToMany(() => Friend, (friend) => friend.requester)
  //   friends: Friend[];
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  setAccountVerified() {
    this.is_verified = true;
  }

  setAccountStatus(newStatus: AccountStatus) {
    this.account_status = newStatus;
  }

  updateProfileVisibility(newVisibility: ProfileVisibility) {
    this.profile_visibility = newVisibility;
  }

  isAdmin() {
    return this.role == UserRole.ADMIN;
  }
}
