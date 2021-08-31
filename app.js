require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const app = express();
app.use(require('./middleware/headers'));
sequelize.sync();
const user = require('./controllers/userController');
const log = require('./controllers/logController');
app.use(express.json());
app.use('/user', user);
app.use('/log', log);
app.listen(3001, () => {
    console.log('App is listening on port 3001');
});