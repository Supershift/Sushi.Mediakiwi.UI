import { ResourcePositionTypeEnum } from "../Enums";
import { ResourceTypesEnum } from "../Enums";

export interface IResource {
  type: ResourceTypesEnum,
  position: ResourcePositionTypeEnum,
  /** Inline source code */
  sourceCode?: string,
  /** Script to be loaded synchronous and be waited upon */
  isSync: boolean,
  /** Path to the resource */
  path: string,
}


export interface IResourceModel {
  type: number;
  position: number;
  isSync: boolean;
  path: string;
  sourceCode: string;
}