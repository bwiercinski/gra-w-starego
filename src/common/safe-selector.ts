export function safeSelector(object: object, path: string, defaultValue: any = null): any {
    const pathList = path.split(".");
    let result = object;
    if (result == null) {
        return defaultValue;
    }
    for (const item of pathList) {
        result = result[item.replace("[]", "")];
        if (result == null) {
            return defaultValue;
        }
    }
    return result;
}
