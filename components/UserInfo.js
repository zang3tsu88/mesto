export default class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileOccupation = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent,
    };
  }

  setUserInfo(userName, userOccupation) {
    this._profileName.textContent = userName.value; // .value maybe not needed. RETURN LATER
    this._profileOccupation.textContent = userOccupation.value; // .value maybe not needed. RETURN LATER
  }
}
