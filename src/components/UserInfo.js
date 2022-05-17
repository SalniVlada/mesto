export class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._elementName = document.querySelector(this._userNameSelector);
    this._elementAbout = document.querySelector(this._userAboutSelector);
    this._avatar = document.querySelector(this._userAvatarSelector);

  }
  
  getUserInfo() {
    const nameContent = this._elementName.textContent;
    const aboutContent = this._elementAbout.textContent;
    const objectUserInfo = {
      name: nameContent,
      about: aboutContent
    }
    return objectUserInfo;
  }

  setUserInfo({newElementName, newElementAbout, userId}) {
    this._elementName.textContent = newElementName;
    this._elementAbout.textContent = newElementAbout;
    this.userId = userId;
  }

  setUserAvatar(newAvatarLink) {
    this._avatar.setAttribute("src", newAvatarLink);
  }
}