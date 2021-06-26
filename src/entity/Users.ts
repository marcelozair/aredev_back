import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
@Entity()

export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  dedication: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  token: string;
}
