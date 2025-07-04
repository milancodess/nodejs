import express from "express";
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password } = req.body;

        if( !email || !password){
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        
        if(!user){
            return res.sendStatus(400);
        }
        
        const expectedHash = authentication(user.authentication.salt, password);
        if ( user.authentication.password != expectedHash ){
            return res.sendStatus(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();
        
        res.cookie('MILAN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});

        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
       return res.status(200).json(user).end();
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}