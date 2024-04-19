"use client";
import { useReducer, createContext, useEffect } from "react";

interface Post {
  _id: string;
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
  image: {
    display_url: string;
    delete_url: string;
  }[];
}

const Default_value = {
  _id: "CurrentPost",
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
  image: [
    {
      display_url: "",
      delete_url: "",
    },
  ],
};

const saveToLocalStorage = (post: Post) => {
  const stringedpost = JSON.stringify(post);
  localStorage.setItem("CurrentPost", stringedpost);
};

export const CurrentPostContext = createContext<{
  CurrentPost: Post;
  dispatch: any;
}>({
  CurrentPost: Default_value,
  dispatch: null,
});

const CurrentPostReducer = (
  state: Post,
  action:
    | {
        type: "REST_POST";
      }
    | {
        type: "SET_POST";
        payload: Post;
      }
    | {
        type: "SET_STRING";
        payload: { key: string; value: string };
      }
    | {
        type: "ADD_AMENTY" | "REMOVE_AMENTY";
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
      saveToLocalStorage(action.payload);
      return action.payload;

    case "REST_POST":
      saveToLocalStorage(Default_value);
      return Default_value;

    case "SET_STRING":
      const { key, value } = action.payload;
      saveToLocalStorage({ ...state, [key]: value });
      return { ...state, [key]: value };

    case "ADD_AMENTY":
      const NewAmenties = [...state["amenities"], action.payload];

      saveToLocalStorage({
        ...state,
        amenities: NewAmenties,
      });
      return {
        ...state,
        amenities: NewAmenties,
      };

    case "REMOVE_AMENTY":
      const NewAmentie = state["amenities"].filter(
        (type: string) => type !== action.payload
      );

      saveToLocalStorage({
        ...state,
        amenities: NewAmentie,
      });

      return {
        ...state,
        amenities: NewAmentie,
      };

    case "CHANGE_DETAILS":
      if (action.payload.operation === "+") {
        saveToLocalStorage({
          ...state,
          [action.payload.variable]: state[action.payload.variable] + 1,
        });
        return {
          ...state,
          [action.payload.variable]: state[action.payload.variable] + 1,
        };
      } else {
        if (state[action.payload.variable] === 0) return state;
        saveToLocalStorage({
          ...state,
          [action.payload.variable]: state[action.payload.variable] - 1,
        });
        return {
          ...state,
          [action.payload.variable]: state[action.payload.variable] - 1,
        };
      }

    case "SET_PERDAY_PRICE":
      if (action.payload) {
        saveToLocalStorage({
          ...state,
          price: {
            perday: action.payload,
            permonth: Number(action.payload) * 30,
          },
        });
        return {
          ...state,
          price: {
            perday: action.payload,
            permonth: Number(action.payload) * 30,
          },
        };
      } else {
        saveToLocalStorage({
          ...state,
          price: {
            perday: 0,
            permonth: 0,
          },
        });
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
        saveToLocalStorage({
          ...state,
          price: {
            perday: state.price.perday,
            permonth: action.payload,
          },
        });

        return {
          ...state,
          price: {
            perday: state.price.perday,
            permonth: action.payload,
          },
        };
      } else {
        saveToLocalStorage({
          ...state,
          price: {
            perday: state.price.perday,
            permonth: 0,
          },
        });

        return {
          ...state,
          price: {
            perday: state.price.perday,
            permonth: 0,
          },
        };
      }

    case "CHANGE_LOCATION":
      saveToLocalStorage({
        ...state,
        location: {
          ...action.payload,
        },
      });

      return {
        ...state,
        location: {
          ...action.payload,
        },
      };

    case "CHANGE_CITYSTATE":
      saveToLocalStorage({
        ...state,
        state: action.payload.state ?? state.state,
        city: action.payload.state ? { name: "", id: 0 } : action.payload.city,
      });
      return {
        ...state,
        state: action.payload.state ?? state.state,
        city: action.payload.state ? { name: "", id: 0 } : action.payload.city,
      };

    default:
      return state;
  }
};

export const CurrentPostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [CurrentPost, dispatch] = useReducer<React.Reducer<Post, any>>(
    CurrentPostReducer,
    Default_value
  );
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("CurrentPost"))
      dispatch({
        type: "SET_POST",
        payload: JSON.parse(localStorage.getItem("CurrentPost")!),
      });
  }, []);

  return (
    <CurrentPostContext.Provider value={{ CurrentPost, dispatch }}>
      {children}
    </CurrentPostContext.Provider>
  );
};
