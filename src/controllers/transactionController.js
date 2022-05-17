import chalk from "chalk";
import db from "../db.js";
import { ObjectId } from "mongodb";

const collection = db.collection("transactions");

export async function getTransaction(req,res){
    const email =  res.locals.email;
    try{
        const transactions = await collection.find({email}).toArray();
        res.status(200).send(transactions);
    }catch(e){
        res.status(500).send(chalk.red("erro getTransaction: "+ e));
    }
}
export async function postTransaction(req,res){
    const transaction = req.body;
    try{
        await collection.insertOne(transaction);
        res.sendStatus(201);
    }catch(e){
        res.status(500).send(chalk.red("erro postTransaction: "+ e));
    }
}
export async function deleteTransaction(req,res){
    const {id} = req.headers;
    try{
        const transaction = await collection.findOne({
            _id: new ObjectId(id)
        });
        if(!transaction){
            res.sendStatus(404);
            return;
        }
        await collection.deleteOne(transaction);
        res.sendStatus(200);
    }catch(e){
        res.status(500).send(chalk.red("erro postTransaction: "+ e));
    }
}