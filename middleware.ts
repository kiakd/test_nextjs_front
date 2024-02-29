import { cookies } from "next/headers"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (!cookies().get("token_laravel_login"))
    {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/user/:path*',
}