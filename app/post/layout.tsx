import { Suspense } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="max-w-[70rem] mx-auto">{children}</div>
    </Suspense>
  );
}

export default Layout;
