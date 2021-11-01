export default interface GridItemModel {
    column: number,
    value: string | undefined | null,
    vueType: string;
    canWrap: boolean;
}
