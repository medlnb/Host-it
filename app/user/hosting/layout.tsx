import { CurrentPostContextProvider } from "@Context/CurrentPostContext";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CurrentPostContextProvider>{children}</CurrentPostContextProvider>
    </div>
  );
}

export default Layout;
