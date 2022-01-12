import { IComponent } from "./IComponent";

export interface ISlot {
    title: string;
    sortOrder: number;
    components: IComponent[];
}