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
    'https://blogsy-2g5m.vercel.app/',
    'https://blogsy-2g5m-pfh9ex8p7-yara-maher-abou-al-soods-projects.vercel.app',
    'https://blogsy-snowy.vercel.app'

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

// Initialize MongoDB connection - but don't block the app startup
// In serverless, connections are established per request
console.log('MongoDB connection will be established per request');

app.use(express.json())

// Ensure database connection for each request
app.use(async (req, res, next) => {
    try {
        await connectionDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

//user 
app.use("/api/users", userRouter)

//posts
app.use("/api/posts", postRouter)

//comments - mount under posts
app.use("/api/posts/:postId/comments", commentRouter)

//handle any invalid urls
app.use('*', (req, res, next) => {
    console.log('Invalid URL accessed:', req.originalUrl);
    return next(new AppError(`Invalid url: ${req.originalUrl}`, 404))
})

//global error handling middleware
app.use(globalErrorHandler)

// Vercel serverless function handler
export default app;

// For Vercel, we need to handle the serverless function properly
if (process.env.NODE_ENV === 'production') {
    // In production (Vercel), the app is automatically handled
    console.log('Running in Vercel serverless environment');
} else {
    // For local development
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
