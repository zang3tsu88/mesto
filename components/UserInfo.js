export default class UserInfo {
  constructor(profileSelectors) {
    this._profileName = document.querySelector(profileSelectors.nameSelector);
    this._profileOccupation = document.querySelector(
      profileSelectors.occupationSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent,
    };
  }

  setUserInfo(userName, userOccupation) {
    this._profileName.textContent = userName.value;
    this._profileOccupation.textContent = userOccupation.value;
  }
}
