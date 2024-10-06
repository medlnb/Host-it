import Provider from "@/components/Provider";
import { ReactNode, Suspense } from "react";
import "@styles/index.css";
import TopBar from "@components/TopBar";
import FloatingWindow from "@components/FloatingWindow";
import { FloatingWinContextProvider } from "@Context/FloatingWinContext";
import { FavoritesContextProvider } from "@Context/FavoritesContext";
import Sonner from "@components/Sonner";

export const metadata = {
  title: "El-Semsar",
  description: "My App Description",
};

function Rootlayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sonner />
        <Provider>
          <FloatingWinContextProvider>
            <main className="app">
              <FloatingWindow />
              <TopBar />
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
