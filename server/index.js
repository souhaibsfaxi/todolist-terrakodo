const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'mysqltodolist',
});

//Root Url
app.get('/', (req, res) => {
  res.send('TODO LIST');
});

//Todo Create
app.post('/create', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const completion_date = req.body.completion_date;
  const priority = req.body.priority;

  db.query(
    'INSERT INTO todos (title,description,completion_date, priority) VALUES (?,?)',
    [title, description, completion_date, priority],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

//All Todo List fecth
app.get('/all', (req, res) => {
  db.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Todo Delete
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Todo Update
app.put('/update', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const completion_date = req.body.completion_date;
  const priority = req.body.priority;

  db.query(
    'UPDATE todos SET title = ?, description = ?, completion_date = ? priority = ?  WHERE id = ?',
    [priority, id, title, description, completion_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(process.env.PORT || PORT, () => {
  console.log(' server is running on port 4000');
});
