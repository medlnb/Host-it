import Provider from "@/components/Provider";
import { ReactNode, Suspense } from "react";
import "@styles/index.css";
import Nav from "@components/Nav";
import FloatingWindow from "@components/FloatingWindow";
import { FloatingWinContextProvider } from "@Context/FloatingWinContext";
import { FavoritesContextProvider } from "@Context/FavoritesContext";
import SmFooter from "@components/SmFooter";

export const metadata = {
  title: "El-Semsar",
  description: "My App Description",
};

function Rootlayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <FloatingWinContextProvider>
            <main className="app">
              <FloatingWindow />
              <div className="hidden sm:flex">
                <Nav />
              </div>

              <Suspense>
                <FavoritesContextProvider>{children}</FavoritesContextProvider>
              </Suspense>
              <div className="block sm:hidden">
                <SmFooter />
              </div>
            </main>
          </FloatingWinContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default Rootlayout;
