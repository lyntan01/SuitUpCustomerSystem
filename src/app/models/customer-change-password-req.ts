export class CustomerChangePasswordReq {
  username: String | undefined;
  oldPassword: String | undefined;
  newPassword: String | undefined;

  constructor(username?: String, oldPassword?: String, newPassword?: String) {
    this.username = username;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
