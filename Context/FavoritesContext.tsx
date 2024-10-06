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
  const { data: session } = useSession();
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch(`/api/post/favorites/${session!.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    };
    if (session) fetchFavorites();
  }, [session]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
