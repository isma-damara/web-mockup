import type { CSSProperties, ReactNode } from "react";

type MockSiteShellProps = {
  children: ReactNode;
};

const siteFontVars = {
  "--font-geist-sans":
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "--font-geist-mono":
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as CSSProperties;

export default function MockSiteShell({ children }: MockSiteShellProps) {
  return (
    <div className="font-sans antialiased" style={siteFontVars}>
      {children}
    </div>
  );
}
