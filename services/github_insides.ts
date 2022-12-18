

export const createGithubInsides = (auth:string|null) => {
  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth,
  });

  const insides = {

    getRateLimit: async () => {
      const { data } = await octokit.rest.rateLimit.get();
      return data;
    },


    getUserInfo: async ({ username }:any) => {

      username = String(username).toLowerCase();

      console.log('Fetching user data', username);
      // Else we proceed with making the request
      try {

        const { data: user } = await octokit.rest.users.getByUsername({
          username,
        });

        return user;
      } catch (err) {
        console.log(err);
        return null;
      }
    },


    getUserRepos: async ({ user, page = 1, per_page = 50 }:any) => {

      console.log('Fetching user data', user);
      // Else we proceed with making the request
      try {

        const { public_repos: repos_count } = user;

        const total_repos_pages = Math.trunc(repos_count / per_page) + 1;

        let repos:any = [];

        const { data: foundRepos } = await octokit.rest.repos.listForUser({
          username: user.login,
          per_page,
          page,
        });
        repos = [...repos, ...foundRepos];

        return repos;
      } catch (err) {
        console.log(err);
        return null;
      }

    },

    gatherUsersLanguages: async (username: string) => {
      username = String(username).toLowerCase();

      const user = await insides.getUserInfo({ username });
      if (user === null) throw new Error(`User does not exist.`);

      //console.log(user);
      const { repos } = user;

      let languages:any = [];

      for (let i = 0; i < repos.length; i++) {

        const repo = repos[i];

        const { data: repoLanguages } = await octokit.rest.repos.listLanguages({
          owner: user.user.login,
          repo: repo.name,
        });

        Object.keys(repoLanguages).forEach(lang => languages[lang] === undefined ? languages[lang] = repoLanguages[lang] : languages[lang] += repoLanguages[lang]);

      }

      //fs.writeFileSync(langFilePath, JSON.stringify(languages, false, 2));
      return languages;

    }
  };

  return insides;
}
