// stores/breadcrumb.ts
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { BreadCrumb } from "@/lib/Interfaces";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const route = useRoute();

  const breadcrumbs = computed<BreadCrumb[]>(() => {
    const matched = route.matched.filter((r) => r.meta?.breadcrumb);

    return matched.map((r) => ({
      label: r.meta?.breadcrumb as string,
      url: r.path,
    }));
  });

  return { breadcrumbs };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBreadcrumbStore, import.meta.hot));
}
