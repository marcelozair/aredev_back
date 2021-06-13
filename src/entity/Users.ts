import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
@Entity()

export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  token: string;
}
