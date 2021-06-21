import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
@Entity()

export class roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;
}
