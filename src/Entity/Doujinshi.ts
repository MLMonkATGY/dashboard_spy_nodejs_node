import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import Author from "./Author";
@Entity()
class Doujinshi {
    @Index({ unique: true })
    @PrimaryColumn()
    id: number;
    @Column()
    name:string;
    @Column()
    thumbnail:string;

    @ManyToOne(() => Author, author=>author.doujins)
    @JoinColumn()
    author : Author; 

}
export default Doujinshi;