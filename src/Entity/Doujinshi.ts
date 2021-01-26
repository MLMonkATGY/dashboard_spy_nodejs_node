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
    @Property()
    tags : string = "";
    @ManyToOne(() => Author)
    author : Author; 
    constructor(id:number, name:string, thumbnail:string , author : Author){
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.author = author;

    }
}
export default Doujinshi;