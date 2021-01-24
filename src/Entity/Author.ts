import {PrimaryKey, Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/core';
import Doujinshi from './Doujinshi.js';
@Entity()
class Author {
    @PrimaryKey()
    name: string;
   
    
    @OneToMany(() => Doujinshi, doujin=>doujin.author)
    author : Doujinshi[]; 

    constructor(name:string){
        this.name = name;
    }

}
export default Author;