import Author from "../Entity/Author.js";
import Doujinshi from "../Entity/Doujinshi.js";
import { EntityManager, MikroORM } from "@mikro-orm/core";

const getEntityManager = async ()=>{
        const orm = await MikroORM.init({
                entities: [Author, Doujinshi],
                dbName: 'alextay96',
                type: 'postgresql',
                clientUrl: 'postgresql://alextay96@127.0.0.1:5432',
                user: 'alextay96',
                password: "Iamalextay96"
              });
        const em = orm.em.fork();
        return em;
}
export default getEntityManager;

