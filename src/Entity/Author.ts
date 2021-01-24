import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index, OneToMany} from "typeorm";
import Doujinshi from "./Doujinshi";

@Entity()
class Author {
    @Index({ unique: true })
    @PrimaryColumn()
    name: string;
    
    @OneToMany(() => Doujinshi, doujin => doujin.author)
    doujins : Doujinshi[];
}
export default Author;