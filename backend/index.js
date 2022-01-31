const express = require('express');
const cors = require('cors');
const handleError = require('./utils/handleError');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(cors());

// api routes v1
app.use('/api/v1/', router);

// errors
app.use(handleError);

app.listen(8000);
