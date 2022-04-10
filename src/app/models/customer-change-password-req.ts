export class CustomerChangePasswordReq {
  email: String | undefined;
  oldPassword: String | undefined;
  newPassword: String | undefined;

  constructor(email?: String, oldPassword?: String, newPassword?: String) {
    this.email = email;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
