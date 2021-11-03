import { ResourcePositionType } from "./ResourcePositionType";
import { ResourceType } from "./ResourceType";

export default interface ResourceModel {
  type: ResourceType,
  position: ResourcePositionType,
  isInline: boolean,
  /** Inline source code */
  sourceCode?: string,
  /** Script to be loaded synchronous and be waited upon */
  isSync: boolean,
  /** Path to the resource */
  path: string,
}
