import LayerConfiguration from "./LayerConfiguration";
import GridColumnModel from "./GridColumnModel";
import GridRowModel from "./GridRowModel";

export default interface GridModel {
    title: string,
    layerConfiguration: LayerConfiguration | undefined | null;
    columns: Array<GridColumnModel>;
    rows: Array<GridRowModel>;
}
