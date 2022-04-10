import { PantsMeasurement } from './pants-measurement';

export class CreatePantsMeasurementReq {
  email: String | undefined;
  password: String | undefined;
  pantsMeasurement: PantsMeasurement | undefined;

  constructor(
    email?: String,
    password?: String,
    pantsMeasurement?: PantsMeasurement
  ) {
    this.email = email;
    this.password = password;
    this.pantsMeasurement = pantsMeasurement;
  }
}
