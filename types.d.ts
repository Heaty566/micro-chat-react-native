declare module '@env' {
    export const SERVER_URL: string;
    export const DEVELOPMENT: string;
}

declare module '*.jpg' {
    const value: any;
    export = value;
}
