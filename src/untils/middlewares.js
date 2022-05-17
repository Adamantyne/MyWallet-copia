import bcrypt from "bcrypt";
import chalk from "chalk";
import {
    signInSchema, signOnSchema, transactionPostSchema,deleteSchema
} from "./schemas.js";
import db from "../db.js";

const abortEarly = { abortEarly: false }

export async function signInValidation(req, res, next) {
    const body = req.body;
    const { email, password } = body;
    const validation = signInSchema.validate(body, abortEarly);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail => detail.message
        ));
        return;
    }
    const user = await db.collection("users").findOne({ email });
    if (!user) {
        res.status(401).send("Usuário não cadastrado");
        return;
    }else if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).send("Senha incorreta");
        return;
    }
    res.locals.user = user;
    next();
}
export async function signOnValidation(req, res, next) {
    const body = req.body;
    const email = body.email;
    const validation = signOnSchema.validate(body, abortEarly);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail => detail.message
        ));
        return;
    }
    if (body.password !== body.repeatPassword) {
        res.status(422).send("Repita a senha corretamente.");
        return;
    }
    const collection = db.collection("users");
    const alreadyExist = await collection.findOne({ email });
    if (alreadyExist) {
        res.status(401).send("Email já cadastrado.");
        return;
    }
    res.locals.collection = collection;
    next();
}
export function transactionPostValidation(req, res, next) {
    const body = req.body;
    const validation = transactionPostSchema.validate(body, abortEarly);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail => detail.message
        ));
        return;
    }
    next();
}
export function deleteValidation(req, res, next) {
    const {id} = req.headers;
    const validation = deleteSchema.validate({id}, abortEarly);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail => detail.message
        ));
        return;
    }
    next();
}
export async function tokenValidation(req, res, next) {
    const { authorization,email } = req.headers;
    const token = authorization?.replace("Bearer ","").trim();
    res.locals.email = email;
    if (!token||!email) {
        res.status(401).send("requisição  não autorizada");
        return;
    }
    try {
        const collection = db.collection("sessions");
        const session = await collection.findOne({email:email});
        if(!session || session.token !== token){
            res.status(401).send("sessão não autorizada");
            return;
        }
    } catch (e) {
        res.status(500).send(chalk.red("erro token: "+ e));
    }
    next();
}