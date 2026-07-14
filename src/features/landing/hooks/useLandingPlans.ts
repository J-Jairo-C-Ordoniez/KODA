import { fetchPlansApi } from "@/features/landing/api/landing.api";
import { useReducer, useEffect } from "react";

type Plan = {
  planId: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  feature: string[];
}

type State = {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: any[] }
  | { type: "FETCH_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, plans: action.payload, isLoading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export function useLandingPlans() {
  const [state, dispatch] = useReducer(reducer, {
    plans: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPlans = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPlansApi();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    fetchPlans();
  }, []);

  return state;
}