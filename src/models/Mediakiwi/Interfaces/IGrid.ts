import { IColumn } from "./IColumn";
import { ILayerConfiguration } from "./ILayerConfiguration";
import { IPagination } from "./IPagination";
import { IRow } from "./IRow";

export interface IGrid {
    title: string;
    layerConfiguration: ILayerConfiguration;
    columns?: IColumn[];
    rows?: IRow[];
    pagination: IPagination;
}