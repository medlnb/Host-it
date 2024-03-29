import Provider from "@/components/Provider";
import { ReactNode, Suspense } from "react";
import "@styles/index.css";
import Nav from "@components/Nav";
import FloatingWindow from "@components/FloatingWindow";
import { FloatingWinContextProvider } from "@Context/FloatingWinContext";
import { FavoritesContextProvider } from "@Context/FavoritesContext";

export const metadata = {
  title: "Akriillooo",
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
              <Nav />
              <Suspense>
                <FavoritesContextProvider>{children}</FavoritesContextProvider>
              </Suspense>
            </main>
          </FloatingWinContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default Rootlayout;
