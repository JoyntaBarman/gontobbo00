export const webinfo : {
    baseURL: string;
    DBURL : string;
} = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
    DBURL: process.env.DATABASE_URL || ''
}