import { NextRequest, NextResponse } from "next/server"

const publicRoutes = [
  { path: "/register", whereAuthenticated: "redirect" },
  { path: "/login", whereAuthenticated: "redirect" },
] as const

const NOT_AUTHENTICATED_ROUTE = "/login"

export function proxy(request: NextRequest) {
  console.log("Middleware rodando:", request.nextUrl.pathname)

  const path = request.nextUrl.pathname

  const publicRoute = publicRoutes.find(
    (route) => route.path === path
  )

  const authToken = request.cookies.get("token")

  if (!authToken && publicRoute) return NextResponse.next()

  if (!authToken && !publicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(url)
  }

  if (authToken && publicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/home"

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
}