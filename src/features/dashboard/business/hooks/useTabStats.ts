import { useReducer, useEffect, useCallback, useState } from "react";
import {
  fetchGeneralStatsApi,
  fetchFinanceStatsApi,
  fetchInventoryStatsApi,
  fetchStoreDataStatsApi,
  updateStoreProfileApi,
} from "@/features/dashboard/business/api/dashboard.api";

type State<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type Action<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T | null }
  | { type: "FETCH_ERROR"; payload: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function useTabStats<T>(activeTab: string) {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: null,
    isLoading: true,
    error: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  const loadTabData = useCallback(async () => {
    if (!activeTab) return;

    dispatch({ type: "FETCH_START" });

    try {
      let data: T | null = null;

      switch (activeTab) {
        case "view-general":
          data = (await fetchGeneralStatsApi()) as T;
          break;

        case "finances":
          data = (await fetchFinanceStatsApi()) as T;
          break;

        case "inventory":
          data = (await fetchInventoryStatsApi()) as T;
          break;

        case "my-store":
          data = (await fetchStoreDataStatsApi()) as T;
          break;
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.message ?? "Error al cargar la información",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    loadTabData();
  }, [loadTabData]);

  const updateStoreProfile = useCallback(async (payload: any) => {
    try {
      setIsSaving(true);

      await updateStoreProfileApi(payload);

      await loadTabData();

      return true;
    } finally {
      setIsSaving(false);
    }
  }, [loadTabData]);

  return {
    ...state,
    refresh: loadTabData,
    updateStoreProfile,
    isSaving,
  };
}