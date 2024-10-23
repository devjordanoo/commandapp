export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
    MAX_PAGE_SIZE: 10,
}

export const COOKIES_NAME = {
    SESSION_TOKEN: 'authjs.session-token',
}