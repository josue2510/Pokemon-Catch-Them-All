const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');

app.set('Port', 8080);
app.use(morgan('dev'));

//Start Server
app.listen(app.get('Port'),() =>{
    console.log('Listening port', app.get('Port'))
})
