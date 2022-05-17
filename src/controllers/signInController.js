import chalk from "chalk";
import db from "../db.js";
import dayjs from "dayjs";
import {v4 as uuid} from "uuid";

export default async function postSignIn(req,res){
    const {email} = req.body;
    const user = res.locals.user;
    try{
        const oldSession=await db.collection("sessions").findOne({email});
        if(oldSession){   
            const session = await db.collection("sessions").find({email}).toArray()
            await db.collection("sessions").deleteOne({email});
        }
        const token = uuid();
        await db.collection("sessions").insertOne({
            email:email, 
            token:token,
            time: dayjs().format("DD/MM/YYYY h:mm:ss")
        });
        delete user.password;
        delete user._id
        res.status(201).send({user,token});
    }catch(e){
        res.status(500).send(chalk.red("erro signIn "+ e));
    }
}