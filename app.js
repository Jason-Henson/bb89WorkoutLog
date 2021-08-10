require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const sequelize = require('./db');
const user = require('./controllers/userController');
const log = require('./controllers/logController');

app.use(express.json()); 
sequelize.sync();

app.use('/user', user);
app.use('/log', log);
 
app.listen(3000, () => {
    console.log('App is listening on port 3000');
});