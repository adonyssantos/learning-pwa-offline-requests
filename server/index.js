const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const Users = [];

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

app.get('/users', (req, res) => res.send(Users));

app.post('/users', (req, res) => {
  const user = {
    ...req.body,
    status: 'delivered',
  };
  Users.push(user);
  res.send(Users);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
