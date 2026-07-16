import { useReducer, useEffect } from "react";
import { fetchSidebarStatsApi, SidebarStats } from "@/features/dashboard/business/api/dashboard.api";

type State = {
  data: SidebarStats | null;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: SidebarStats }
  | { type: "FETCH_ERROR"; payload: string };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, isLoading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default function useSidebarStats() {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchSidebarStatsApi();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    loadData();
  }, []);

  return state;
}