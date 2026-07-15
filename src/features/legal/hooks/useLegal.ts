import { useReducer, useEffect } from "react";
import fetchPolicyApi, { Policy } from "@/features/legal/api/legal.api";

type State = {
  policy: Policy | null;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Policy }
  | { type: "FETCH_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, policy: action.payload, isLoading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default function useLegal(title: string) {
  const [state, dispatch] = useReducer(reducer, {
    policy: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadPolicy = async () => {
      if (!title) return;

      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPolicyApi(title);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    loadPolicy();
  }, [title]);

  return state;
}