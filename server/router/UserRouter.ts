import { Router } from "express";
import User from "../model/User";
import { compare, genSalt, hash } from "bcrypt";
import validator from "validator";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

config();
const router = Router();

if (!process.env.JWT_KEY) throw new Error("SALT not defined in .env file");
if (!process.env.SALT) throw new Error("SALT not defined in .env file");
const SALT = parseInt(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;


router.post("/login", async (req, res) => {
    const { username, password } = req.body;



    try {
        const user = await login(username, password);
        res.send({
            message: "login successful.",
            login: true,
            JWT: genJWT(username)
        });
    } catch (error: any) {
        res.send({ error: error.message });
    }
})

router.post("/signup", async (req, res) => {

    const { username, password } = req.body;
    try {
        const user = await signup(username, password);
        res.send({
            message: "Signup successful.",
            login: true,
            JWT: genJWT(username)
        });
    } catch (error: any) {
        res.send({ error: error.message });
    }
})
router.post("/jwt", async (req, res) => {

    const { jwt } = req.headers
    const info: JwtPayload = await verify(jwt as string, JWT_KEY) as JwtPayload;
    if (info) {
        const user = await User.findOne({ username: info.username });
        if (user) {
            res.send({
                verified: true
            });
            return
        }
    }

    res.send({
        verified: false
    });
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
        res.send({
            name: user.username,
        })
    } else {
        res.send({
            error: "User not found."
        })
    }
}
)


const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("invalid username or password");
    const match = await compare(password, user.password);
    if (!match) throw new Error("invalid username or password");
    return user;
}
const signup = async (username: string, password: string) => {
    const user = new User({ username, password: await saltPassword(password) });

    try {
        await user.save();
    } catch (error: any) {
        if (error.code === 11000) {

            error.message = "Username or email already exists."
        }
        throw error;
    }
}




const genJWT = (username: string) => {
    const token = sign({ username: username, }, JWT_KEY);
    return token;
}

const saltPassword = async (password: string) => {
    if (!validator.isAlphanumeric(password) || password.length <= 5) throw new Error("Password must be alphanumeric and at least 6 characters long.")
    const salt = await genSalt(SALT);
    return hash(password, salt);
}

export default router;