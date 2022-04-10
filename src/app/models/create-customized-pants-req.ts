import { CustomizedPants } from './customized-pants';

export class CreateCustomizedPantsReq {
  email: string | undefined;
  password: string | undefined;
  customizedPants: CustomizedPants | undefined;
  fabricId: number | undefined;
  pantsCuttingId: number | undefined;
  pantsMeasurementId: number | undefined;

  constructor(
    email?: string,
    password?: string,
    customizedPants?: CustomizedPants,
    fabricId?: number,
    pantsCuttingId?: number,
    pantsMeasurementId?: number
  ) {
    this.email = email;
    this.password = password;
    this.customizedPants = customizedPants;
    this.fabricId = fabricId;
    this.pantsCuttingId = pantsCuttingId;
    this.pantsMeasurementId = pantsMeasurementId;
  }
}
