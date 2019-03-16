const fetch = require('node-fetch');

let getRepo = async () => {
  const resp = await fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 6e5066bbd67946ca0b2b2bc1b0ae01e4a159d59d',
    },
  });
  // Filter out forked repos
  // let repos = Array(resp.json());
  // return repos.filter(repo => repo.fork === false);
  let repos = await resp.json();
  return repos.filter(repo => !repo.fork);
};

module.exports = getRepo;
