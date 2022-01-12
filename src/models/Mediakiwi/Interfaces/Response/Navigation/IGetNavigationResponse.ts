import { INavigation, INavigationItem } from "../../index";
export interface IGetNavigationResponse extends INavigation {
    homeUrl: string;
    items: INavigationItem[];
    logoUrl: string;
    statusCode: number;
}