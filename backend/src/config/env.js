import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT:process.env.PORT,
    NODE_ENV:process.env.Node_ENV, 
    MONGO_URI:process.env.MONGO_URI,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    CLAUDINARY_CLOUD_NAME:process.env.CLAUDINARY_CLOUD_NAME,
    CLAUDINARY_API_KEY:process.env.CLAUDINARY_API_KEY,
    CLAUDINARY_API_SECRET:process.env.CLAUDINARY_API_SECRET,
    ARCJET_KEY:process.env.ARCJET_KEY,


};