"use client";
import { useSession } from "next-auth/react";
import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const FavoritesContext = createContext<{
  favorites: string[] | null;
  setFavorites: Dispatch<SetStateAction<string[] | null>> | null;
}>({
  favorites: null,
  setFavorites: null,
});

export const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[] | null>(null);
  const session = useSession();
  useEffect(() => {
    setFavorites(["66fd1001ad40c1be48cac45f"]);

    const fetchFavorites = async () => {
      const res = await fetch(`/api/post/favorites`, {
        cache: "no-cache",
      });
      if (res.ok) return;
      const data = await res.json();
      setFavorites(["66fd1001ad40c1be48cac45f"]);
    };
    // fetchFavorites();
  }, [session]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
