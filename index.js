const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
mongoose.Promise = global.Promise;

const app = express()

const db = require('./config/db').database;

//database connection 
mongoose.connect(db,{
         useNewUrlParser:true,
         useCreateIndex:true,
         useUnifiedTopology:true
    })
    .then(() => {
        console.log('Database success')
    })
    .catch((err) => {
        console.log('Unable to connect', err)
    });
//definiendo el puerto 
const port = process.env.PORT || 5000;

//Middleware cors
app.use(cors());

// BpodyParser middleware

app.use(bodyParser.json());


// mongoose.connect(url, {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// })
// const con = mongoose.connection

// con.on('open', () => {
//     console.log('connected...')
// })

// Public directory
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/blog.html'));
});

const postRoutes = require('./routes/apis/post');
app.use('/api', postRoutes)

app.listen(port, () => {
    console.log('servidor listo')
});