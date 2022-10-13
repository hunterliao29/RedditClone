
import { verify, JwtPayload } from "jsonwebtoken";
import User from "../model/User.js";

if (!process.env.JWT_KEY) throw new Error("SALT not defined in .env file");
const JWT_KEY = process.env.JWT_KEY;

const auth = async (req: any, res: any, next: any) => {

    const jwt = req.headers.jwt;
    if (!jwt) {
        return next();
    }
    try {

        const payload = verify(jwt, JWT_KEY) as JwtPayload
        if (payload) {
            res.locals.user = await User.findOne({ username: payload.username });
        }

    } catch (error) {
        console.log(error);
    }
    return next();
}

export default auth;