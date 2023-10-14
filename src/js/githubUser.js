export class GitHubUser {
  static async search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    const data = await fetch(endpoint);
    const {
      login,
      name,
      bio,
      created_at,
      public_repos,
      followers,
      following,
      location,
      twitter_username,
      blog,
      company
    } = await data.json();
    return {
      login,
      name,
      bio,
      created_at,
      public_repos,
      followers,
      following,
      location,
      twitter_username,
      blog,
      company,
    };
  }
}
