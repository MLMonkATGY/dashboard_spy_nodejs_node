import {PrimaryKey, Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/core';
import Author from './Author.js';
@Entity()
class Doujinshi {
    @PrimaryKey()
    id: number;
    @Property()
    name:string;
    @Property()
    thumbnail:string;

    @ManyToOne(() => Author)
    author : Author; 

}
export default Doujinshi;