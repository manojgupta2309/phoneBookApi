const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const db =  require("./db/db");
const api =  require("./api");
var path = require('path');
const port = process.env.PORT || 3500;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.init();

app.use('/api',api)


app.get('/test',(req,res)=>{
    res.send("Test")
})
app.use('/',express.static("build"))
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('./build/index.html'));
});
  
process.on('uncaughtException', function(err) {
  console.log(" UNCAUGHT EXCEPTION ");
  console.log("[Inside 'uncaughtException' event] " + err.stack || err.message);
});
  
process.on('uncaughtPromiseRejection', function(err) {
  console.log(" UNCAUGHT EXCEPTION ");
  console.log(err.message);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
