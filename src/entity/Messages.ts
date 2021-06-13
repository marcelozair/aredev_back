import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
@Entity()

export class messages {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sala_id: number;
  
  @Column()
  group_id: number;

  @Column()
  user_id: number;

  @Column()
  message: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
