import express from 'express'
import cors from 'cors';
import connectionDB from './db/connectionDB.js'
import userRouter from './src/modules/users/user.routes.js'
import postRouter from './src/modules/posts/post.routes.js'
import commentRouter from './src/modules/comments/comments.routes.js'
import { AppError } from './utils/classError.js'
import { globalErrorHandler } from './utils/globalErrorHandling.js'
import dotenv from "dotenv";

dotenv.config();

const app = express();

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://blogsy-pearl.vercel.app'

];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            console.log('Request with no origin - allowing');
            return callback(null, true);
        }

        console.log('Request origin:', origin);

        if (allowedOrigins.indexOf(origin) === -1) {
            console.log('Origin not allowed:', origin);
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }

        console.log('Origin allowed:', origin);
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

connectionDB()


app.use(express.json())

//user 
app.use("/users", userRouter)

//posts
app.use("/posts", postRouter)


//comments
app.use("/comments", commentRouter)


//handle any invalid urls
app.use('*', (req, res, next) => {
    return next(new AppError(`Invalid url: ${req.originalUrl}`, 404))
})

//global error handling middleware
app.use(globalErrorHandler)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))