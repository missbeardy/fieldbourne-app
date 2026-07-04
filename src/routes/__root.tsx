import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand">
          404 — Off the map
        </div>
        <h1 className="mt-4 text-6xl font-black tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          That page doesn't exist. Let's get you back to solid ground.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-all hover:bg-brand-glow"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground hover:bg-brand-glow"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-xl border border-hairline bg-foreground/[0.04] px-5 py-3 text-sm font-bold text-foreground hover:bg-foreground/[0.07]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FieldBourne Digital — Run your jobs. Not your inbox." },
      {
        name: "description",
        content:
          "Job management for Australian trade businesses. One system for leads, scheduling and follow-ups, built around how you already work.",
      },
      { name: "author", content: "FieldBourne Digital" },
      { name: "theme-color", content: "#0b1220" },
      { property: "og:title", content: "FieldBourne Digital — Run your jobs. Not your inbox." },
      {
        property: "og:description",
        content:
          "One system for leads, scheduling and follow-ups. Bespoke to your trade. Aussie owned.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
