const fs = require('fs');
const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 const port = process.env.PORT || 5000;


//참고용예제 -> Localhost:/api/hello -> Hello Express! 메시지가 나오는 Api
//  app.get('/api/hello', (req, res) => {
//     res.send({ message: 'Hello Express!'});
//  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const connection = mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database

});

connection.connect();

app.get('/api/customers', (req, res) => {
   //res.send();
   connection.query(
      "SELECT * FROM Customer",
      (err, rows, fields) => {
        res.send(rows);
      }      
   );    

});


 app.listen(port, () => console.log(`Listening on port ${port}`));
