const express = require('express');
const cors = require('cors');
const router = require('./router');
const { errorLogger, errorHandler } = require('./middlewares/handleError');

const app = express();

app.use(express.json());
app.use(cors());

// api routes v1
app.use('/api/v1/', router);

// errors
app.use(errorLogger);
app.use(errorHandler);

app.listen(8000);
