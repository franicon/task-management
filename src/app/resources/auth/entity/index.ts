import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}

export { Auth };
