export class PantsMeasurement {
    pantsMeasurementId: number | undefined;
    legsLength: number | undefined;
    lowerWaistGirth: number | undefined;
    hipGirth: number | undefined;
    crotch: number | undefined;
    thighGirth: number | undefined;
    kneeGirth: number | undefined;
    calfGirth: number | undefined;
    pantsOpeningWidth: number | undefined;
    
    constructor(
        pantsMeasurementId?: number,
        legsLength?: number,
        lowerWaistGirth?: number,
        hipGirth?: number,
        crotch?: number,
        thighGirth?: number,
        kneeGirth?: number,
        calfGirth?: number,
        pantsOpeningWidth?: number
    ) {
        this.pantsMeasurementId = pantsMeasurementId;
        this.legsLength = legsLength;
        this.lowerWaistGirth = lowerWaistGirth;
        this.hipGirth = hipGirth;
        this.crotch = crotch;
        this.thighGirth = thighGirth;
        this.kneeGirth = kneeGirth;
        this.calfGirth = calfGirth;
        this.pantsOpeningWidth = pantsOpeningWidth;
    }
}
