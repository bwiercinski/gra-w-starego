export function safeSelector(object: object, path : string, defaultValue = undefined): any {
    let pathList = path.split('.');
    let result = object;
    if (result == null) {
        return defaultValue;
    }
    for(let item of pathList) {
        result = result[item.replace('[]','')];
        if (result == null) {
            return defaultValue;
        }
    }
    return result;
}
