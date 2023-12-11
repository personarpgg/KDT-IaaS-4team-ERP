const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MariaDB 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'test'
});

// 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MariaDB');
});

// 루트 엔드포인트
app.get('/', (req, res) => {
  connection.query('SELECT * FROM dd', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
    console.log("DB연결 성공");
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
