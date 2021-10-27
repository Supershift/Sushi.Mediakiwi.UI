import GridItemModel from "./GridItemModel";

export default interface GridRowModel {
    gridItems: Array<GridItemModel>;
    id: string;
    href: string | null,
}
