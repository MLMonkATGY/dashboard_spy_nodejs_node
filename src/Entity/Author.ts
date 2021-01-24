import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
export default Author;