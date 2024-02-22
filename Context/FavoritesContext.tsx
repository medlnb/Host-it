"use client";
import { useSession } from "next-auth/react";
import { useReducer, createContext, useEffect } from "react";

interface Favorites {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  image: string[];
}

export const FavoritesContext = createContext<{
  favorites: Favorites[] | null;
  dispatch: any;
}>({
  favorites: null,
  dispatch: null,
});

const favoritesReducer = (
  state: Favorites[] | null,
  action: {
    type: "SET_FAVORITES" | "ADD_FAVORITE" | "REMOVE_FAVORITE";
    payload: Favorites[] | string;
  }
) => {
  switch (action.type) {
    case "SET_FAVORITES":
      if (typeof action.payload !== "string") return action.payload;
    case "ADD_FAVORITE":
      if (typeof action.payload === "string") return state;
      if (!state) return [action.payload[0]];
      return [...state, action.payload[0]];

    case "REMOVE_FAVORITE":
      if (typeof action.payload !== "string") return state;
      if (state === null) return state;
      return state.filter((favorite) => favorite._id !== action.payload);
    default:
      return state;
  }
};

export const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, dispatch] = useReducer<
    React.Reducer<Favorites[] | null, any>
  >(favoritesReducer, null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;
      const response = await fetch(`/api/post/favorites/${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_FAVORITES", payload: data });
      }
    };
    fetchFavorites();
  }, [session]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
