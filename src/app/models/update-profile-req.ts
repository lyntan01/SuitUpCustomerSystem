export class UpdateProfileReq {
  email: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
