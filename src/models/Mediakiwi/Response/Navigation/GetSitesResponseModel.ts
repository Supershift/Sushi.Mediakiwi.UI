export interface GetSitesResponseModel {
    statusCode: number,
    message: string,
    items: SiteItem[]
}
export interface SiteItem {
    id: number,
    title: string,
    culture: string,
    weekStart: number
}