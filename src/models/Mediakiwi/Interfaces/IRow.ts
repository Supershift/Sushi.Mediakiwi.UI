
export interface IRowItem {
    value: string,
    vueType: number,
    canWrap: boolean
}
  
export interface IRow {
    href: string,
    id: number,
    title: string,
    items: IRowItem[],
}
