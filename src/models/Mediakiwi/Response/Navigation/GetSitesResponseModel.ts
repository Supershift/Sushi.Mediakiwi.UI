export interface SiteItem {
    id: number,
    title: string,
    culture: string,
    weekStart: number
}
export interface GetSitesResponseModel {
    statusCode: number,
    message: string,
    items: SiteItem[]
}
