import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './routes/graphql/schema.js'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => { console.log('DB Connection Successfull!'); })
    .catch((err) => {
        console.log('DB Connection Failure: ' + err.message);
    });

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, './upload')))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Backend server listening on port: ', `http://localhost:${server.address().port}/graphql`);
});