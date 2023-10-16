import { GitHubUser } from "./githubUser.js";
import { creationDayTreatment, toggleClassNotAvailable } from "./utils.js";

export class Finder {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  async add(username) {
    try {
      this.user = await GitHubUser.search(username);

      if (this.user.login === undefined) {
        document.querySelector("#form").classList.add("error");
        throw new Error("User not Found");
      }

      document.querySelector("#form").classList.remove("error");

      this.update();
    } catch (error) {
      console.log(error);
    }
  }
}

export class FinderView extends Finder {
  constructor(root) {
    super(root);

    this.onSearch();
    this.toggle();
  }

  onSearch() {
    const searchButton = this.root.querySelector("#btn-search");
    searchButton.onclick = (event) => {
      event.preventDefault();

      const { value } = this.root.querySelector("#search");

      this.add(value);
    };
  }

  update() {
    const userPage = this.root.querySelector("#github-user");
    this.user.created_at = creationDayTreatment(this.user.created_at);

    userPage.querySelector(
      "img"
    ).src = `https://github.com/${this.user.login}.png`;
    userPage.querySelector("img").alt = `Imagem de ${this.user.name}`;
    userPage.querySelector("#name").textContent = this.user.name;
    userPage.querySelector("a").href = `https://github.com/${this.user.login}`;
    userPage.querySelector("a").textContent = `@${this.user.login}`;
    userPage.querySelector("#bio").textContent = this.user.bio;
    userPage.querySelector("#created-at").textContent = this.user.created_at;
    userPage.querySelector("#account-numbers #repos").textContent =
      this.user.public_repos;
    userPage.querySelector("#account-numbers #followers").textContent =
      this.user.followers;
    userPage.querySelector("#account-numbers #following").textContent =
      this.user.following;
    userPage.querySelector("#user-info #location").textContent =
      this.user.location;

    if (this.user.twitter_username !== null) {
      userPage.querySelector("#user-info #twitter").textContent =
        this.user.twitter_username;
      userPage.querySelector(
        "#user-info #twitter"
      ).href = `https://twitter.com/${this.user.twitter_username}`;
      toggleClassNotAvailable("twitter");
    } else {
      userPage.querySelector("#user-info #twitter").textContent =
        "Not Available";
      toggleClassNotAvailable("twitter");
    }

    if (this.user.blog !== "" && this.user.blog !== null) {
      userPage.querySelector("#user-info #blog").href = this.user.blog;
      userPage.querySelector("#user-info #blog").textContent = this.user.login;
      toggleClassNotAvailable("blog");
    } else {
      userPage.querySelector("#user-info #blog").textContent = "Not Available";
      toggleClassNotAvailable("blog");
    }

    if (this.user.location !== null) {
      userPage.querySelector("#user-info #location").textContent =
        this.user.location;
      toggleClassNotAvailable("location");
    } else {
      userPage.querySelector("#user-info #location").textContent =
        "Not Available";
      toggleClassNotAvailable("location");
    }

    if (this.user.company !== null) {
      userPage.querySelector("#user-info #company").textContent =
        this.user.company;
      toggleClassNotAvailable("company");
    } else {
      userPage.querySelector("#user-info #company").textContent =
        "Not Available";
      toggleClassNotAvailable("company");
    }
    
    document.documentElement.classList.add("running");
  }

    document.documentElement.classList.add('running')
  }
}
