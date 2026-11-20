import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getAccountProfile, roleDestinations, type AccountRole } from "@/lib/auth/roles";
import { getSupabaseConfig } from "./config";
import {
  cookieOptionsForSession,
  REMEMBER_COOKIE,
} from "./session";

const protectedRoutes: Record<string, AccountRole> = {
  "/pengguna": "pengguna",
  "/mitra": "mitra",
  "/admin": "admin",
};

function routeRole(pathname: string) {
  const prefix = Object.keys(protectedRoutes).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  return prefix ? protectedRoutes[prefix] : null;
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRole = routeRole(pathname);
  const config = getSupabaseConfig();

  if (!config) {
    if (!requiredRole) return NextResponse.next({ request });
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const remember = request.cookies.get(REMEMBER_COOKIE)?.value === "1";
  const pendingCookies: Array<{
    name: string;
    value: string;
    options: CookieOptions;
  }> = [];

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          pendingCookies.push({
            name,
            value,
            options: cookieOptionsForSession(options, remember),
          });
        });
      },
    },
  });

  const withPendingCookies = (response: NextResponse) => {
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (!requiredRole) {
      return withPendingCookies(NextResponse.next({ request }));
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return withPendingCookies(NextResponse.redirect(loginUrl));
  }

  const profile = await getAccountProfile(supabase, user.id);
  if (!profile?.isActive) {
    await supabase.auth.signOut();
    return withPendingCookies(
      NextResponse.redirect(new URL("/login?status=akun-tidak-aktif", request.url)),
    );
  }

  if (pathname === "/login") {
    return withPendingCookies(
      NextResponse.redirect(new URL(roleDestinations[profile.role], request.url)),
    );
  }

  if (requiredRole && profile.role !== requiredRole) {
    return withPendingCookies(
      NextResponse.redirect(new URL(roleDestinations[profile.role], request.url)),
    );
  }

  return withPendingCookies(NextResponse.next({ request }));
}

