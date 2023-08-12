const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const login_router = require('./routes/sign_in');
const register_router = require('./routes/sign_up');
const token_close_router = require('./routes/tokenClose');
const dotenv = require('dotenv')
const  {authenticateToken} = require('./middleware/autherization');
const port = 8000;

dotenv.config();
const app = express();
app.use(cors());
app.use(bp.json());

// routes
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/sign_in',login_router);
app.post('/sign_up', register_router);
app.post('/sign_out', token_close_router);

// server
app.listen(port, () => console.log('SIR YES SIR!'));
