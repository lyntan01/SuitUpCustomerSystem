import { JacketMeasurement } from './jacket-measurement';

export class UpdateJacketMeasurementReq {
  email: String | undefined;
  password: String | undefined;
  jacketMeasurement: JacketMeasurement | undefined;

  constructor(
    email?: String,
    password?: String,
    jacketMeasurment?: JacketMeasurement
  ) {
    this.email = email;
    this.password = password;
    this.jacketMeasurement = jacketMeasurment;
  }
}
