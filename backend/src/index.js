const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const database = require("./api/firebase");
const analyse = require("./analyse");

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
  const githubId = userJson.id.toString();

  database.collection("applicants").doc(githubId).set({
    profile: userJson,
    technologies: [],
    repositories: []
  });

  res.json(githubId);
  analyse(githubId, authJson.access_token);
});

app.listen(3001, () => console.log(`Example app listening on port 3001`));