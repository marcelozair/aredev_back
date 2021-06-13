import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()

export class notifications{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    message: string;

    @Column()
    user_id: number;

    @Column()
    level: number;

    @Column()
    reason: string;
}