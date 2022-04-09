export class JacketMeasurement {
    jacketMeasurementId: number | undefined;
    neck: number | undefined;
    frontLength: number | undefined;
    chestGirth: number | undefined;
    frontChestWidth: number | undefined;
    upperWaistGrith: number | undefined;
    hipGirth: number | undefined;
    armhole: number | undefined;
    shoulderWidth: number | undefined;
    sleeveLength: number | undefined;
    backwidth: number | undefined;
    bicepGirth: number | undefined;
    forearmGirth: number | undefined;
    wristGirth: number | undefined;
    
    constructor(
        jacketMeasurementId?: number,
        neck?: number,
        frontLength?: number,
        chestGirth?: number,
        frontChestWidth?: number,
        upperWaistGrith?: number,
        hipGirth?: number,
        armhole?: number,
        shoulderWidth?: number,
        sleeveLength?: number,
        backwidth?: number,
        bicepGirth?: number,
        forearmGirth?: number,
        wristGirth?: number,
    ) {
        this.jacketMeasurementId = jacketMeasurementId;
        this.neck = neck;
        this.frontLength = frontLength;
        this.chestGirth = chestGirth;
        this.frontChestWidth = frontChestWidth;
        this.upperWaistGrith = upperWaistGrith;
        this.hipGirth = hipGirth;
        this.armhole = armhole;
        this.shoulderWidth = shoulderWidth;
        this.sleeveLength = sleeveLength;
        this.backwidth = backwidth;
        this.bicepGirth = bicepGirth;
        this.forearmGirth = forearmGirth;
        this.wristGirth = wristGirth;
    }
}
