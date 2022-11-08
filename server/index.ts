import app from './app';
import db from './db';
import {config} from 'dotenv'
config()
const port = process.env.PORT || 3000;

db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}.`);
    });
});