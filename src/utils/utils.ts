export const portalName = "webcontent";
 
// API specific utils
export function apiUrlBuilder(path: string) {
    // TODO: Implement environment variables
    const url = `${process.env.VUE_APP_BASE_API}/${path}`;
    return url;
}