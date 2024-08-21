"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Define the state interface
interface State {
  isMenuOpen: boolean;
}

// Define the action types
const TOGGLE_MENU = "TOGGLE_MENU";
const CLOSE_MENU = "CLOSE_MENU";

// Define the action interface
interface ToggleMenuAction {
  type: typeof TOGGLE_MENU;
}

interface CloseMenuAction {
  type: typeof CLOSE_MENU;
}

type Action = ToggleMenuAction | CloseMenuAction;

// Define the reducer function type
type Reducer = (state: State, action: Action) => State;

// Initial state
const initialState: State = {
  isMenuOpen: false,
};

// Reducer function
const menuReducer: Reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case CLOSE_MENU:
      return {
        ...state,
        isMenuOpen: false,
      };
    default:
      return state;
  }
};

// Define the context interface
interface GlobalContextType {
  state: State;
  toggleMenu: () => void;
  closeMenu: () => void;
}

// Create context with a default value of `null`
const GlobalContext = createContext<GlobalContextType | null>(null);

// Context provider component
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const toggleMenu = () => {
    dispatch({ type: TOGGLE_MENU });
  };

  const closeMenu = () => {
    dispatch({ type: CLOSE_MENU });
  };

  return (
    <GlobalContext.Provider value={{ state, toggleMenu, closeMenu }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the menu context
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
