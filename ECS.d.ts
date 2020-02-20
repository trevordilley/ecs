export interface Entity {
    components: Set<string>;
}
export declare const entity: () => Entity;
export interface System {
    allOf?: string[];
    oneOf?: string[];
    noneOf?: string[];
    execute: (entities: Entity[], deltaTime: number) => Entity[];
}
export declare const engine: (allEntities: Entity[], systems: System[], deltaTime: number) => Entity[];
