import { create } from "zustand";

interface Breadcrumb {
  label: string;
  isLink: boolean;
  active: boolean;
}

interface BreadcrumbsStore {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbsRoute: (route: string) => void;
  setBreadcrumbsProduct: (route: string, product: string, variant: string) => void;
}

const levelMain = "página de inicio";

const useBreadcrumbsStore = create<BreadcrumbsStore>((set) => ({
    breadcrumbs: [
        { label: levelMain, isLink: false, active: false },
        { label: "mujer", isLink: true, active: true }
    ],

    setBreadcrumbsRoute: (route) => {
        set({
            breadcrumbs: [
                { label: levelMain, isLink: false, active: false },
                { label: route, isLink: true, active: true }
            ]
        });
    },

    setBreadcrumbsProduct: (route, product, variant) => {
        set({
            breadcrumbs: [
                { label: levelMain, isLink: false, active: false },
                { label: route, isLink: true, active: false },
                { label: product, isLink: false, active: false },
                { label: variant, isLink: true, active: true }
            ]
        });
    },
}));

export default useBreadcrumbsStore;