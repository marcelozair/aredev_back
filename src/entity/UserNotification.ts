import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()

export class userNotification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    notifications_id: number;

    @Column()
    view: number;
}