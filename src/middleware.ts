import { match, P } from "ts-pattern";
import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database.types";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const path = req.nextUrl.pathname;
  const isAuthPage = path.includes("/auth");

  // 有効期限が切れたセッションを更新
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return match({ user, isAuthPage })
    .with({ user: P.nullish, isAuthPage: true }, () => {
      // ユーザー未認証 & /auth ページの場合

      return NextResponse.next();
    })
    .with({ user: P.not(P.nullish), isAuthPage: true }, () => {
      // ユーザー認証済み & /auth ページの場合
      const redirectUrl = req.nextUrl.clone();
      const redirectTo = redirectUrl.searchParams.get("redirectTo");
      if (redirectTo) {
        redirectUrl.pathname = redirectTo;
        redirectUrl.searchParams.delete("redirectTo");
      } else {
        redirectUrl.pathname = "/";
      }

      return NextResponse.redirect(redirectUrl);
    })
    .with({ user: P.not(P.nullish) }, () => {
      // ユーザー認証済み

      return NextResponse.next();
    })
    .otherwise(() => {
      // それ以外の場合（ユーザー未認証）
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/auth";
      redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    });
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
