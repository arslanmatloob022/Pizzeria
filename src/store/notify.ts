import { defineStore } from "pinia";

export const useNotifyStore = defineStore("notify", () => {
  const notification = ref({ 
    show: false, 
    message: "", 
    type: "success" as "success" | "error" | "info" 
  });

  const notify = {
    success: (message: string) => {
      notification.value = { show: true, message, type: "success" };
      setTimeout(() => notification.value.show = false, 2000);
    },
    error: (message: string) => {
      notification.value = { show: true, message, type: "error" };
      setTimeout(() => notification.value.show = false, 2000);
    },
    info: (message: string) => {
      notification.value = { show: true, message, type: "info" };
      setTimeout(() => notification.value.show = false, 2000);
    }
  };

  return {
    notification,
    notify,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotifyStore, import.meta.hot));
}