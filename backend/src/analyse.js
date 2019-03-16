const database = require('./api/firebase');
const Octokit = require('@octokit/rest');

function analyse(githubId, token) {
  const octokit = new Octokit({ auth: `token ${token}` });

  set_technologies(githubId, octokit);
  set_repositories(githubId, octokit);
}

async function set_technologies(githubId, octokit) {
  const reposResponse = await octokit.repos.list({ per_page: 100 });

  const repos = reposResponse.data;

  const technologiesObject = {};

  for (const githubRepo of repos) {
    try {
      const [owner, repo] = githubRepo.full_name.split('/');
      const commitsResponse = await octokit.repos.listCommits({ owner, repo });
      const stats = await Promise.all(
        commitsResponse.data.map(async commit => {
          const detailedCommitResponse = await octokit.repos.getCommit({ owner, repo, sha: commit.sha });

          const detailedCommit = detailedCommitResponse.data;

          return {
            author:
              (detailedCommit.author && detailedCommit.author.id) ||
              (detailedCommit.commit && detailedCommit.commit.author && detailedCommit.commit.author.id),
            changes: detailedCommit.stats.total,
          };
        }),
      );

      const ownerContributions = stats
        .filter(stat => stat.author)
        .filter(stat => stat.author.toString() === githubId)
        .reduce((acc, curr) => acc + curr.changes, 0);
      const totalContributions = stats.reduce((acc, curr) => acc + curr.changes, 0);

      if (totalContributions > 0) {
        // avoid division by 0! :)
        const languagesResponse = await octokit.repos.listLanguages({ owner, repo });
        const languages = languagesResponse.data;

        const ownerRatio = ownerContributions / totalContributions;

        Object.keys(languages).map(language => {
          const scoreAddition = languages[language] * ownerRatio;
          if (technologiesObject[language]) {
            technologiesObject[language] += scoreAddition;
          } else {
            technologiesObject[language] = scoreAddition;
          }
        });
      }
    } catch (e) {
      console.error(e.message, 'Oh well ¯\\_(ツ)_/¯');
    }
  }

  const technologies = Object.keys(technologiesObject)
    .filter(name => technologiesObject[name] > 0)
    .map(name => ({
      name,
      score: technologiesObject[name],
    }));

  database
    .collection('applicants')
    .doc(githubId)
    .update({ technologies });
}

async function set_repositories(githubId, octokit) {
  const reposResponse = await octokit.repos.list({ per_page: 100 });

  const repos = reposResponse.data;

  const repositories = await Promise.all(
    repos.map(async githubRepo => {
      const [owner, repo] = githubRepo.full_name.split('/');
      let languagesResponse = null;
      try {
        languagesResponse = await octokit.repos.listLanguages({ owner, repo });
      } catch (e) {
        console.error(`Couldn't list languages for ${repo.name}`, e);
      }
      const languages = languagesResponse ? languagesResponse.data : [];
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
