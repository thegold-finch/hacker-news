export function getUrlSite(url) {
    return url ? url.split("/")[2].replace("www.", "") : null;
}