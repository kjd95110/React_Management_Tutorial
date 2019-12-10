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

app.get('/api/customers', (req, res) => {

    res.send([
        {
            'id':1,
            'image':'https://placeimg.com/64/64/1',
            'name':'홍길동1',
            'birthday':'961222',
            'gender':'남자',
            'job':'대학생'
          },
          {
            'id':2,
            'image':'https://placeimg.com/64/64/2',
            'name':'홍길동2',
            'birthday':'971222',
            'gender':'여자',
            'job':'대학생'
          },
          {
            'id':3,
            'image':'https://placeimg.com/64/64/3',
            'name':'홍길동3',
            'birthday':'981222',
            'gender':'여자',
            'job':'디자이너'
          }

    ])

});


 app.listen(port, () => console.log(`Listening on port ${port}`));
