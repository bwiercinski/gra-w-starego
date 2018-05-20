export const randomArrayElement = <T>(array: T[]): T =>
    array && array.length > 0 ? array[Math.floor(Math.random() * array.length)] : null;
