import LayerConfigurationModel from "./LayerConfigurationModel";
import GridColumnModel from "./GridColumnModel";
import GridRowModel from "./GridRowModel";

export default interface GridModel {
    title: string,
    layerConfiguration: LayerConfigurationModel | undefined | null;
    columns: Array<GridColumnModel>;
    rows: Array<GridRowModel>;
}
