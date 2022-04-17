import { CustomizedPants } from './customized-pants';

export class CreateCustomizedPantsReq {
  email: string | undefined;
  password: string | undefined;
  newCustomizedPants: CustomizedPants | undefined;
  fabricId: number | undefined;
  pantsCuttingId: number | undefined;
  pantsMeasurementId: number | undefined;

  constructor(
    email?: string,
    password?: string,
    newCustomizedPants?: CustomizedPants,
    fabricId?: number,
    pantsCuttingId?: number,
    pantsMeasurementId?: number
  ) {
    this.email = email;
    this.password = password;
    this.newCustomizedPants = newCustomizedPants;
    this.fabricId = fabricId;
    this.pantsCuttingId = pantsCuttingId;
    this.pantsMeasurementId = pantsMeasurementId;
  }
}
