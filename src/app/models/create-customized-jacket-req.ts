import { CustomizedJacket } from './customized-jacket';

export class CreateCustomizedJacketReq {
  email: string | undefined;
  password: string | undefined;
  customizedJacket: CustomizedJacket | undefined;
  pocketStyleId: number | undefined;
  jacketStyleId: number | undefined;
  innerFabricId: number | undefined;
  outerFabricId: number | undefined;
  jacketMeasurementId: number | undefined;

  constructor(
    email?: string,
    password?: string,
    customizedJacket?: CustomizedJacket,
    pocketStyleId?: number,
    jacketStyleId?: number,
    innerFabricId?: number,
    outerFabricId?: number,
    jacketMeasurementId?: number
  ) {
    this.email = email;
    this.password = password;
    this.customizedJacket = customizedJacket;
    this.pocketStyleId = pocketStyleId;
    this.jacketStyleId = jacketStyleId;
    this.innerFabricId = innerFabricId;
    this.outerFabricId = outerFabricId;
    this.jacketMeasurementId = jacketMeasurementId;
  }
}
