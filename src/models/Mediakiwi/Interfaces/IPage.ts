import { ISlot } from "./ISlot";

export interface IPage {
  title: string;
  completePath: string;
  slots: ISlot[];
  isPublished: boolean;
  id: number;
}