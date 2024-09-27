const express = require('express')

const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')


const { readdirSync } = require('fs')


const app = express();

connectDB()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit: '10mb'}))
app.use('/uploads', express.static('uploads'));

app.use('/api/uploads', (req, res, next) => {
    const filePath = req.path;
    res.redirect(`/uploads${filePath}`);
  });

readdirSync('./Routes')
    .map((r)=> app.use('/api', require('./Routes/'+ r)))


app.listen(5000,()=> console.log('Server is Running on port 5000')) 