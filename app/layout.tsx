import Provider from "@/components/Provider";
import { ReactNode } from "react";
import "@styles/index.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "Akriillooo",
  description: "My App Description",
};

function Rootlayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default Rootlayout;
