//code by Antolina Gonzalez
//server
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
mongoose.Promise = global.Promise;

const app = express()

const db = require('./config/db').database;

//Coneccion a la base de datos
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

// BodyParser middleware

app.use(bodyParser.json());

// Directorio public donde se encuentran los archivos estaticos

app.use(express.static(__dirname + '/public'));

//direccionar como pagina principal blog.html
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/blog.html'));
});

//require las rutas apis
const postRoutes = require('./routes/apis/post');
app.use('/api', postRoutes)

//puerto 
app.listen(port, () => {
    console.log('servidor listo')
});