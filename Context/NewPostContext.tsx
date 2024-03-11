"use client";
import { useReducer, createContext, useEffect } from "react";

interface Post {
  id: string | null;
  title: string;
  type: string;
  state: {
    name: String;
    id: number;
  };
  city: {
    name: String;
    id: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  price: {
    perday: number;
    permonth: number;
  };
  Bedrooms: number;
  Bathrooms: number;
  Guests: number;
  Beds: number;
  amenities: string[];
}

const Default_value = {
  id: null,
  title: "",
  type: "Villa",
  state: {
    name: "Alger Centre",
    id: 16,
  },
  city: {
    name: "Alger Centre",
    id: 0,
  },
  location: {
    lat: 36.7681618,
    lng: 3.0404258,
  },
  description: "",
  price: {
    perday: 0,
    permonth: 0,
  },
  Bedrooms: 0,
  Bathrooms: 0,
  Guests: 0,
  Beds: 0,
  amenities: [],
  image: [],
};
export const NewPostContext = createContext<{
  NewPost: Post;
  dispatch: any;
}>({
  NewPost: Default_value,
  dispatch: null,
});

const NewPostReducer = (
  state: Post,
  action:
    | {
        type: "SET_POST";
        payload: Post;
      }
    | {
        type:
          | "SET_TITLE"
          | "SET_DESCRIPTION"
          | "SET_TYPE"
          | "ADD_AMENTY"
          | "REMOVE_AMENTY";
        payload: string;
      }
    | {
        type: "SET_PERDAY_PRICE" | "SET_PERMONTH_PRICE";
        payload: number;
      }
    | {
        type: "CHANGE_DETAILS";
        payload: {
          operation: "+" | "-";
          variable: "Bedrooms" | "Bathrooms" | "Beds" | "Guests";
        };
      }
    | {
        type: "CHANGE_LOCATION";
        payload: {
          lat: number;
          lng: number;
        };
      }
    | {
        type: "CHANGE_CITYSTATE";
        payload: {
          city: {
            name: string;
            id: number;
          };
          state?: {
            name: string;
            id: number;
          };
        };
      }
) => {
  switch (action.type) {
    case "SET_POST":
      return action.payload;
    case "CHANGE_DETAILS":
      if (action.payload.operation === "+") {
        localStorage.setItem(
          action.payload.variable,
          (state[action.payload.variable] + 1).toString()
        );
        return {
          ...state,
          [action.payload.variable]: state[action.payload.variable] + 1,
        };
      } else {
        if (state[action.payload.variable] !== 0) {
          localStorage.setItem(
            action.payload.variable,
            (state[action.payload.variable] - 1).toString()
          );
          return {
            ...state,
            [action.payload.variable]: state[action.payload.variable] - 1,
          };
        }
        return state;
      }
    case "SET_TYPE":
      localStorage.setItem("NewPost.type", action.payload);
      return { ...state, type: action.payload };

    case "SET_TITLE":
      localStorage.setItem("NewPost.title", action.payload);
      return { ...state, title: action.payload };

    case "SET_DESCRIPTION":
      localStorage.setItem("NewPost.description", action.payload);
      return { ...state, description: action.payload };

    case "SET_PERDAY_PRICE":
      if (action.payload) {
        localStorage.setItem("NewPost.perdayprice", action.payload.toString());
        localStorage.setItem(
          "NewPost.permonthprice",
          (action.payload * 30).toString()
        );
        return {
          ...state,
          price: {
            perday: action.payload,
            permonth: Number(action.payload) * 30,
          },
        };
      } else {
        localStorage.removeItem("NewPost.perdayprice");
        localStorage.removeItem("NewPost.permonthprice");

        return {
          ...state,
          price: {
            perday: 0,
            permonth: 0,
          },
        };
      }

    case "SET_PERMONTH_PRICE":
      if (action.payload) {
        localStorage.setItem(
          "NewPost.permonthprice",
          action.payload.toString()
        );
        return {
          ...state,
          price: {
            perday: state.price.perday,
            permonth: action.payload,
          },
        };
      } else {
        localStorage.removeItem("NewPost.permonthprice");
        return {
          ...state,
          price: {
            perday: state.price.perday,
            permonth: 0,
          },
        };
      }
    case "ADD_AMENTY":
      const NewAmenties = [...state["amenities"], action.payload];
      localStorage.setItem("amenities", NewAmenties.join(","));
      return {
        ...state,
        amenities: NewAmenties,
      };

    case "REMOVE_AMENTY":
      const NewAmentie = state["amenities"].filter(
        (type: string) => type !== action.payload
      );
      localStorage.setItem("amenities", NewAmentie.join(","));
      return {
        ...state,
        amenities: NewAmentie,
      };

    case "CHANGE_LOCATION":
      localStorage.setItem("lat", action.payload.lat.toString());
      localStorage.setItem("lng", action.payload.lng.toString());
      return {
        ...state,
        location: {
          ...action.payload,
        },
      };
    case "CHANGE_CITYSTATE":
      if (action.payload.state) {
        localStorage.setItem("state", action.payload.state?.id.toString());
        localStorage.setItem("city", "0");
      } else localStorage.setItem("city", action.payload.city.id.toString());
      return {
        ...state,
        state: action.payload.state ?? state.state,
        city: action.payload.state ? { name: "", id: 0 } : action.payload.city,
      };
    default:
      return state;
  }
};

export const NewPostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [NewPost, dispatch] = useReducer<React.Reducer<Post, any>>(
    NewPostReducer,
    Default_value
  );
  useEffect(() => {
    if (typeof window !== "undefined")
      dispatch({
        type: "SET_POST",
        payload: {
          id: null,
          title: localStorage.getItem("NewPost.title") ?? "",
          type: localStorage.getItem("NewPost.type") ?? "Villa",
          state: localStorage.getItem("state")
            ? {
                name: "Alger Centre",
                id: Number(localStorage.getItem("state")),
              }
            : {
                name: "Alger Centre",
                id: 16,
              },
          city: localStorage.getItem("city")
            ? {
                name: "",
                id: Number(localStorage.getItem("city")),
              }
            : {
                name: "Alger Centre",
                id: 0,
              },
          location: {
            lat: localStorage.getItem("lat")
              ? Number(localStorage.getItem("lat"))
              : 36.7681618,
            lng: localStorage.getItem("lng")
              ? Number(localStorage.getItem("lng"))
              : 3.0404258,
          },
          description: localStorage.getItem("NewPost.description") ?? "",
          price: {
            perday: localStorage.getItem("NewPost.perdayprice")
              ? Number(localStorage.getItem("NewPost.perdayprice"))
              : 0,
            permonth: localStorage.getItem("NewPost.permonthprice")
              ? Number(localStorage.getItem("NewPost.permonthprice"))
              : 0,
          },
          Bedrooms: localStorage.getItem("Bedrooms")
            ? Number(localStorage.getItem("Bedrooms"))
            : 0,
          Bathrooms: localStorage.getItem("Bathrooms")
            ? Number(localStorage.getItem("Bathrooms"))
            : 0,
          Guests: localStorage.getItem("Guests")
            ? Number(localStorage.getItem("Guests"))
            : 0,
          Beds: localStorage.getItem("Beds")
            ? Number(localStorage.getItem("Beds"))
            : 0,
          amenities: localStorage.getItem("amenities")
            ? (localStorage.getItem("amenities") + "").split(",")
            : [],
          image: [],
        },
      });
  }, []);
  return (
    <NewPostContext.Provider value={{ NewPost, dispatch }}>
      {children}
    </NewPostContext.Provider>
  );
};
