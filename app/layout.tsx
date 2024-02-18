import Provider from "@/components/Provider";
import { ReactNode, Suspense } from "react";
import "@styles/index.css";
import Nav from "@components/Nav";
import FloatingWindow from "@components/FloatingWindow";
import { FloatingWinContextProvider } from "@Context/FloatingWinContext";

export const metadata = {
  title: "Akriillooo",
  description: "My App Description",
};

function Rootlayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvdAJhlVyx2nd1imxk6m5BCza6N_l3T0Y&libraries=places"></script>
      </head>
      <body>
        <Provider>
          <FloatingWinContextProvider>
            <main className="app">
              <FloatingWindow />
              <Nav />
              <Suspense>{children}</Suspense>
            </main>
          </FloatingWinContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default Rootlayout;
