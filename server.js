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

const multer = require('multer');
const upload = multer({dest: './upload'}); //업로드 폴더를 설정한다.

app.get('/api/customers', (req, res) => {
   //res.send();
   connection.query(
      "SELECT * FROM Customer WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }      
   );    

});

app.use('/image',express.static('./upload')); //사용자입장에서는 image폴더로 접근을 하는데 실제 upload 폴더와 매핑이 된다는 것임.
app.post('/api/customers', upload.single('image'), (req,res) => {  // 사용자는  image라는 변수로 실제로 profill이미지의 bianry데이터를 우리서버로 전송하니까요 그것을 받아옵니다.
  let sql = "INSERT INTO Customer VALUES (null, ?, ?, ?, ?, ?, now(), 0)";  //id는 자동증가
  let image = '/image/' + req.file.filename;  //사용자는 image폴더경로로 접근해서 서버의 upload폴더의 image를 이용하는것.
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

console.log(name,image,birthday,gender,job);

  let params = [ image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );
});

app.delete('/api/customers/:id', (req, res)  => {
  let sql = 'UPDATE Customer SET isDeleted = 1 WHERE id = ?';  
  let params= [req.params.id];
  connection.query(sql, params,
   (err, rows, fields) => {
     res.send(rows);
   }
  )
});


 app.listen(port, () => console.log(`Listening on port ${port}`));

