import { MikroORM } from '@mikro-orm/core';
import Author from "../Entity/Author.js";
import Doujinshi from "../Entity/Doujinshi.js";
import {default as settings} from "../Db/GetDbSettings.js"





const setupSchema = async () => {
  const orm = await MikroORM.init({
    entities: [Author,Doujinshi],
    dbName: 'alextay96',
    type: 'postgresql',
    clientUrl: 'postgresql://alextay96@127.0.0.1:5432',
    user: 'alextay96',
    password: "Iamalextay96"
  });
  const generator = orm.getSchemaGenerator();

  await generator.dropSchema();
  await generator.createSchema();
  // await generator.updateSchema()
  await orm.close(true);
};
export default setupSchema;