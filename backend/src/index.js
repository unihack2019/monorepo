const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const database = require("./api/firebase");

dotenv.config();

app.use(cors());

app.post('/github/:code', async(req, res) => {
  const requestToken = req.params.code;
  const authResponse = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&code=${requestToken}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });
  const authJson = await authResponse.json();

  const userResponse = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `token ${authJson.access_token}`
    }
  });
  const userJson = await userResponse.json();

  database.collection("applicants").doc(userJson.id.toString()).set({
    name: userJson.name,
    email: userJson.email,
    token: authJson.access_token
  });
  res.json(userJson.id);
});

app.listen(3001, () => console.log(`Example app listening on port 3001`));