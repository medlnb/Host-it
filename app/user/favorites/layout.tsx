import { Suspense } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default Layout;
