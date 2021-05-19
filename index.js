const express = require("express");
const cors = require('cors');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(cors());

app.use(express.static(path.resolve(__dirname,'public/')));


app.get('/', function (req, res, next){
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(app.get('port'),()=>{
    console.log("Server On");
})