import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//see more in this doc: https://typeorm.io/entities

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ select: false })
    createdAt: Date;

    @Column({ select: false })
    updatedAt: Date;

    @Column({ select: false })
    active: Boolean;
}
