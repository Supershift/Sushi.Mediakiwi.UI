export const portalName = "webcontent";

 // API specific utils
export function apiUrlBuilder(path: string) {
    // TODO: Implement environment variables
    const url = `https://mediakiwi-demo-cms.azurewebsites.net/${path}`;
    return url;
}