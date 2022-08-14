import express, { json } from 'express';
import cors from 'cors';
import router from 'src/router';
import errorHandler from 'src/middlewares/error-handler.middleware';

const app = express();

app.use(json());
app.use(cors());

app.use('/api/v1/', router);

app.use(errorHandler);

app.listen(8000, () => {
    return console.log(`server is listening on ${8000}`);
});
