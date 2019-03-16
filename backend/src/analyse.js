const database = require('./api/firebase');
const Octokit = require('@octokit/rest');

function analyse(githubId, token) {
  // set_technologies(githubId, token);
  set_repositories(githubId, token);
}

async function set_technologies(githubId, token) {
  // todo: do stuff
  const octokit = new Octokit({ auth: `token ${token}` });
  technologies = [];
  database
    .collection('applicants')
    .doc(githubId)
    .set({ technologies });
}

async function set_repositories(githubId, token) {
  const octokit = new Octokit({ auth: `token ${token}` });
  const reposResponse = await octokit.repos.list({ per_page: 100 });

  const repos = reposResponse.data.filter(repo => !repo.fork);

  const repositories = await Promise.all(
    repos.map(async githubRepo => {
      const [owner, repo] = githubRepo.full_name.split('/');
      const languagesResponse = await octokit.repos.listLanguages({ owner, repo });
      const languages = languagesResponse.data;
      const technologies = Object.keys(languages).map(name => ({
        name,
        locs: languages[name],
      }));

      return { githubRepo, technologies };
    }),
  );
  await database
    .collection('applicants')
    .doc(githubId)
    .update({ repositories });
}

module.exports = analyse;
