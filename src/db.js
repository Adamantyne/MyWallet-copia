import chalk from "chalk";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db = null;
try{
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATA_BASE);
}catch(e){
    console.log(chalk.red("Deu ruim pra conectar meu querido: "+error));
}
export default db;