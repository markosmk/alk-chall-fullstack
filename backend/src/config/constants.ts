import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

const config = {
    // NODE_ENV: process.env.NODE_ENV !== 'production',
    // PORT: process.env.PORT || 8000,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    hostname: process.env.DB_HOSTNAME as string,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME as string,
    jwt_secret: process.env.JWT_SECRET as Secret
};
export default config;
