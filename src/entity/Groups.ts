import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
@Entity()

export class notas {

  constructor() {
    this.id = 0
    this.creator_id = 0
    this.name = ""
    this.description = ""
    this.img = ""
    this.created_at = new Date()
    this.updated_at = new Date()
  }

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
