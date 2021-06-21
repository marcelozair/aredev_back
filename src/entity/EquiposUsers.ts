import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
@Entity()

export class equipos_users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  equipo_id: number;

  @Column()
  user_id: number;

  @Column()
  rol: number;
}
