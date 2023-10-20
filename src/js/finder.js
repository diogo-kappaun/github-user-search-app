import { GitHubUser } from "./githubUser.js";
import * as utils from "./utils.js";

export class Finder {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@user-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@user-favorites:", JSON.stringify(this.entries));
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
  }

  onSearch() {
    const searchButton = this.root.querySelector("#btn-search");
    searchButton.onclick = (event) => {
      event.preventDefault();

      const { value } = this.root.querySelector("#search");

      this.add(value);

      this.root.querySelector("#search").value = ""
    };
  }

  update(user) {
    const userPage = this.root.querySelector("#github-user");
    const favoriteStar = this.root.querySelector("#favorite-star");
    this.user.created_at = utils.creationDayTreatment(this.user.created_at);

    userPage.querySelector(
      "#github-user-image"
    ).src = `https://github.com/${this.user.login}.png`;
    userPage.querySelector(
      "#github-user-image"
    ).alt = `Imagem de ${this.user.name}`;
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
      utils.toggleClassNotAvailable("twitter");
    } else {
      userPage.querySelector("#user-info #twitter").textContent =
        "Not Available";
      utils.toggleClassNotAvailable("twitter");
    }

    if (this.user.blog !== "" && this.user.blog !== null) {
      userPage.querySelector("#user-info #blog").href = this.user.blog;
      userPage.querySelector("#user-info #blog").textContent = this.user.login;
      utils.toggleClassNotAvailable("blog");
    } else {
      userPage.querySelector("#user-info #blog").textContent = "Not Available";
      utils.toggleClassNotAvailable("blog");
    }

    if (this.user.location !== null) {
      userPage.querySelector("#user-info #location").textContent =
        this.user.location;
      utils.toggleClassNotAvailable("location");
    } else {
      userPage.querySelector("#user-info #location").textContent =
        "Not Available";
      utils.toggleClassNotAvailable("location");
    }

    if (this.user.company !== null) {
      userPage.querySelector("#user-info #company").textContent =
        this.user.company;
      utils.toggleClassNotAvailable("company");
    } else {
      userPage.querySelector("#user-info #company").textContent =
        "Not Available";
      utils.toggleClassNotAvailable("company");
    }

    const findUser = this.entries.some(
      (entry) => entry.name === this.user.name
    );

    if (findUser) {
      favoriteStar.classList.add("favorite");
      utils.changeClassFavorite(favoriteStar);
    } else {
      favoriteStar.classList.remove("favorite");
      utils.changeClassFavorite(favoriteStar);
    }

    document.documentElement.classList.add("running");
  }
}

export class FinderFavorite extends FinderView {
  constructor(root) {
    super(root);

    this.load();
    this.onadd();
    this.updateFavorite();
    this.toggle();
  }

  tbody = this.root.querySelector("#favorite-box table tbody");

  toggle() {
    const btnfavorite = this.root.querySelector("#favorites-toggle");
    const favoriteList = this.root.querySelector("#favorite-box");

    this.tbody.childNodes.forEach((element) => {
      element.addEventListener("click", (e) => {
        let userName = ""

        if (e.target.querySelector('#user-name')) {
          userName = e.target.querySelector("#user-name").textContent
        } else if (e.target.parentElement.querySelector("#user-name")) {
          userName = e.target.parentElement.querySelector("#user-name").textContent;
        } else {
          userName = e.target.parentElement.parentElement.querySelector("#user-name").textContent;
        }
        
        this.add(userName)

        favoriteList.classList.remove("show");
        btnfavorite.classList.remove("show");
      })
    });

    btnfavorite.onclick = () => {
      favoriteList.classList.toggle("show");
      btnfavorite.classList.toggle("show");
    };
  }

  onadd() {
    const favoriteStar = this.root.querySelector("#favorite-star");

    favoriteStar.onclick = () => {
      if (!favoriteStar.classList.contains("favorite")) {
        this.entries = [...this.entries, this.user];
        this.save();
        this.update();
        this.updateFavorite();
      } else {
        this.delete();
        this.update();
        this.updateFavorite();
      }
    };
  }

  delete() {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== this.user.login
    );
    this.entries = filteredEntries;
    this.save();
  }

  updateFavorite() {
    this.tbody.innerHTML = ""
    this.entries.forEach((user) => {
      const favoriteUser = this.createRow();

      favoriteUser.querySelector(
        "img"
      ).src = `https://github.com/${user.login}.png`;
      favoriteUser.querySelector("#user-name").textContent = `${user.login}`;
      favoriteUser.querySelector("#name").textContent = `${user.name}`;

      this.tbody.append(favoriteUser);
      this.toggle()
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><img src="" alt=""/></td>
      <td id="user-name"></td>
      <td id="name"></td>
    `;

    return tr;
  }
}