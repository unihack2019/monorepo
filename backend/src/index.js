const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());

app.post('/github/:code', async(req, res) => {
  const requestToken = req.params.code;
  const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&code=${requestToken}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });
  const json = await response.json();
  res.json(json);
});

app.listen(3001, () => console.log(`Example app listening on port 3001`));