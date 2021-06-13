import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
@Entity()

export class notas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
