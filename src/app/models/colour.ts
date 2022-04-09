import { Fabric } from './fabric';

export class Colour {
    colourId: number | undefined;
    name: string | undefined;
    hexCode: string | undefined;
    fabrics: Fabric[] | undefined;
    
    constructor(
        colourId?: number,
        name?: string,
        hexCode?: string
    ) {
        this.colourId = colourId;
        this.name = name;
        this.hexCode = hexCode;
    }
}
