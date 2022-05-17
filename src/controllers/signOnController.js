import chalk from "chalk";
import bcrypt from "bcrypt";

export default async function postSignOn(req,res){
    const {name,email,password} = req.body;
    const cryptPassword = bcrypt.hashSync(password,10);
    try{
        const collection=res.locals.collection;
        await collection.insertOne({
            name:name,
            email:email,
            password:cryptPassword
        });
        res.status(201).send("Conta criada com sucesso !");
    }catch(e){
        res.status(500).send(chalk.red("erro signOn: "+ e));
    }
}