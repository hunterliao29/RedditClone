import { Router } from "express";
import Post from "../model/Post";
import Sub from "../model/Sub";


const router = Router();

router.get("/home", async (req, res) => {
    const posts = await Post.find({ type: "post" }).sort({ time: -1 });


    res.send({
        posts
    })
})

router.post("/", async (req, res) => {
    const { sub, title, message, } = req.body;
    const user = res.locals.user;
    const post = new Post({
        title: title,
        message: message,
        sub: sub,
        by: user._id,
        time: new Date().getTime()
    });
    try {

        await post.save();
        res.send({
            message: "Post created."
        })
    } catch (error: any) {

        res.send({ message: error.message });
    }
})
router.get("/:id/child", async (req, res) => {
    
    const { id } = req.params;
    const post = await Post.findById(id);
    console.log("here");
    if (post) {
        const childPosts = await Post.find({ parent: id });

        res.send(
            { posts: childPosts }
        )
    } else {
        res.send({
            error: "Post not found."
        })
    }
})

router.get("/:sub/:filter", async (req, res) => {
    const { sub, filter } = req.params;

    const subDoc = await Sub.findOne({ url: sub });

    var posts = await Post.find({ sub: subDoc?._id, type: "post" }).sort({ time: -1 });

    if (posts) {
        res.send({
            posts
        })
    } else {
        res.send({
            posts: []
        })
    }

})





router.post("/:id/child", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
        const childPosts = new Post({
            message: req.body.message,
            by: res.locals.user._id,
            type: "comment",
            sub: post.sub,
            time: new Date().getTime(),
            parent: id,
        });
        await childPosts.save();

        
        res.send(
            { posts: childPosts }
        )
    } else {
        res.send({
            error: "Post not found."
        })
    }
})
router.put("/:id/upvote", async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.findById(id);
    if (post) {
        const postHistory = user.posts.filter((post: any) => post.post._id == id)
        if (postHistory.length == 1) {
            if (postHistory[0].vote == 1) return res.send({ votes: post.votes })
            if (postHistory[0].vote == 0) {
                postHistory[0].vote = 1;
                // post.votes;
                const newVote = post.votes as { up: number, down: number }
                newVote.up++;
                post.votes = newVote
                await post.save()
                await user.save()
                return res.send({ votes: post.votes })
            }
            if (postHistory[0].vote == -1) {
                postHistory[0].vote = 0;
                const newVote = post.votes as { up: number, down: number }
                newVote.up++;
                post.votes = newVote
                await post.save()
                await user.save()
                return res.send({ votes: post.votes })
            }
        } else {


            const newVote = post.votes as { up: number, down: number }
            newVote.up++;
            user.posts.push({ post: post._id, vote: 1 })
            await post.save()
            await user.save()
            return res.send({ votes: post.votes })
        }

    } else {
        return res.status(500).send({ message: "oops" })
    }
})
router.put("/:id/downvote", async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.findById(id);

    if (post) {
        const postHistory = user.posts.filter((post: any) => post.post._id == id)
        if (postHistory.length == 1) {
            if (postHistory[0].vote == -1) return res.send({ votes: post.votes })
            if (postHistory[0].vote == 0) {
                postHistory[0].vote = -1;
                // post.votes;
                const newVote = post.votes as { up: number, down: number }
                newVote.down++;
                post.votes = newVote
                await post.save()
                await user.save()
                return res.send({ votes: post.votes })
            }

            if (postHistory[0].vote == 1) {
                postHistory[0].vote = 0;
                const newVote = post.votes as { up: number, down: number }
                newVote.down++;
                post.votes = newVote
                await post.save()
                await user.save()
                return res.send({ votes: post.votes })
            }
        } else {


            const newVote = post.votes as { up: number, down: number }
            newVote.down++;
            user.posts.push({ post: post._id, vote: -1 })
            await post.save()
            await user.save()
            return res.send({ votes: post.votes })
        }

    } else {
        return res.status(500).send({ message: "oops" })
    }
})


export default router;