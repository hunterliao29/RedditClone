
import { Router } from "express";
import { ObjectId } from "mongoose";
import { userInfo } from "os";

import Sub from "../model/Sub";

const router = Router();



router.get("/joined/:sub", async (req, res) => {
    if (!res.locals.user) {
        res.send({
            joined: "Join"
        })
        return
    }
    const { sub } = req.params;
    const subDoc = await Sub.findOne({ url: sub });
    if (!subDoc) {
        res.send({
            error: "Sub not found."
        })
        return
    }
    const user = res.locals.user;
    if (user.subs.includes(subDoc._id)) {
        res.send({
            joined: "Joined"
        })
        return
    } else {
        res.send({
            joined: "Join"
        })
        return
    }


})

router.post("/join/:sub", async (req, res) => {
    const { sub } = req.params;
    const subDoc = await Sub.findOne({ url: sub });
    if (!subDoc) {
        res.send({
            error: "Sub not found."
        })
        return
    }
    const user = res.locals.user;
    if (!user.subs.includes(subDoc._id)) user.subs.push(subDoc._id);
    await user.save();
    res.send({
        joined: "Joined"
    })

})
router.post("/leave/:sub", async (req, res) => {
    const { sub } = req.params;
    const subDoc = await Sub.findOne({ url: sub });
    if (!subDoc) {
        res.send({
            error: "Sub not found."
        })
        return
    }
    const user = res.locals.user;
    user.subs.filter((sub: any) => {
        return !subDoc._id.equals(sub);
    })
    await user.save();
    res.send({
        joined: "Join"
    })

})

router.get("/:sub", async (req, res) => {

    const sub = await Sub.findOne({ url: req.params.sub })

    console.log(sub);
    if (!sub) {
        
        res.send({ sub: undefined })

    } else {

        res.send({ sub: sub })
    }
})
router.get("/name/:id", async (req, res) => {

    const sub = await Sub.findById(req.params.id)

    console.log(sub);
    if (!sub) {
        
        res.send({ sub: undefined })

    } else {

        res.send({ sub: sub })
    }
})

router.post("/", async (req, res) => {

    const { url, sub, description } = req.body;

    const newSub = new Sub({
        url: url,
        name: sub,
        description: description
    })


    try {
        await newSub.save();

        const user = res.locals.user
        user.subs.push(newSub.id)
        await user.save()
        console.log("here");
        res.send({
            message: "success",
            error: null
        }).status(200);
    } catch (error: any) {
        if (error.code === 11000) {
            res.send({ error: "sub already exists" }).status(500)
        } else {
            res.send({ error: error.message }).status(500)
        }
        console.log(error);
        

    }
})
router.get("/", async (req, res) => {
    if(!res.locals.user){
        res.send({subs:[]})
        return
    }
    const subs = [...res.locals.user.subs];
    const name = [];
    for (let sub of subs) {
        const subDoc = await Sub.findById(sub);
        if (subDoc) name.push({
            id: subDoc._id,
            url: subDoc.url
        });
    }

    res.send({
        subs: name
    })
})

export default router;