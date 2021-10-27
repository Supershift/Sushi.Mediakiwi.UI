interface GridItem {
    column: number,
    value: string | undefined | null,
    href: string | undefined | null,
    vueType: string;
}

interface GridRowModel {
    gridItems: Array<GridItem>;
    rowID: number;
}

interface GridColumnModel {
    title: string | undefined | null;
    width: string | undefined | null;
    align: number | undefined | null;
}

interface GridModel {
    columns: Array<GridColumnModel>;
    rows: Array<GridRowModel>;
}

export default GridModel;
