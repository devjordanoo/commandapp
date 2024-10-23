import { NextResponse, NextRequest } from 'next/server'
import { getUrl } from './lib/get-url'
import { COOKIES_NAME } from './lib/config';

export function middleware(req: NextRequest) {
    const token = req.cookies.get(COOKIES_NAME.SESSION_TOKEN);
    const pathname = req.nextUrl.pathname;

    if(pathname == '/auth' && token) {
        return NextResponse.redirect(new URL(getUrl('/app')));
    }

    if(pathname.includes('/app') && !token) {
        return NextResponse.redirect(new URL(getUrl('/auth')));
    }

    if(pathname == '/') {
        if(token) {
            return NextResponse.redirect(new URL(getUrl('/app')));
        }

        return NextResponse.redirect(new URL(getUrl('/auth')));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}