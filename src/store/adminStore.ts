import { LayoutGrid, Utensils } from "lucide-vue-next";

export const useAdminStore = defineStore("adminStore", () => {
  const tabs = ref([
    {
      id: 1,
      title: "Categories",
      value: "categories",
      icon: LayoutGrid,
    },
    { id: 2, title: "Menu Items", value: "menuItems", icon: Utensils },
  ]);

  const adminCategoriesRows = ref([
    {
      uuid: "32156",
      companyName: "Zazzo Pizza Co",
      description: "Testing Company Descriptions",
      status: true,
    },
    {
      uuid: "32155",
      companyName: "Zazzo Pizza Co",
      description: "Testing Company Descriptions",
      status: true,
    },
    {
      uuid: "32154",
      companyName: "Zazzo Pizza Co",
      description: "Testing Company Descriptions",
      status: true,
    },
    {
      uuid: "32153",
      companyName: "Zazzo Pizza Co",
      description: "Testing Company Descriptions",
      status: true,
    },
    {
      uuid: "32152",
      companyName: "Zazzo Pizza Co",
      description: "Testing Company Descriptions",
      status: true,
    },
  ]);

  const adminMenuitemsRows = ref([
    {
      uuid: "32156",
      dishName: "Special Pizza",
      price: "12.65$",
      description: "Testing Company Descriptions",
      tiktokVideo: "https://www.pexels.com/download/video/7008562/",
      instaVideo: "https://www.pexels.com/download/video/7008562/",
      position: "A",
      status: true,
    },
    {
      uuid: "32155",
      dishName: "Special Pizza",
      price: "12.65$",
      description: "Testing Company Descriptions",
      tiktokVideo: "https://www.pexels.com/download/video/7008562/",
      instaVideo: "https://www.pexels.com/download/video/7008562/",
      position: "A",
      status: true,
    },
    {
      uuid: "32154",
      dishName: "Special Pizza",
      price: "12.65$",
      description: "Testing Company Descriptions",
      tiktokVideo: "https://www.pexels.com/download/video/7008562/",
      instaVideo: "https://www.pexels.com/download/video/7008562/",
      position: "A",
      status: true,
    },
    {
      uuid: "32153",
      dishName: "Special Pizza",
      price: "12.65$",
      description: "Testing Company Descriptions",
      tiktokVideo: "https://www.pexels.com/download/video/7008562/",
      instaVideo: "https://www.pexels.com/download/video/7008562/",
      position: "A",
      status: true,
    },
  ]);

  const activeTab = ref("categories");
  const searchQuery = ref("");

  //actionbar main button text
  const buttonText = computed(() =>
    activeTab.value === "categories" ? "Add New Category" : "Add Menu Item"
  );

  // Filtered categories based on search
  const filteredCategories = computed(() => {
    if (!searchQuery.value.trim()) {
      return adminCategoriesRows.value;
    }
    const query = searchQuery.value.toLowerCase();
    return adminCategoriesRows.value.filter(
      (category) =>
        category.companyName.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.uuid.toLowerCase().includes(query)
    );
  });

  // Filtered menu items based on search
  const filteredMenuItems = computed(() => {
    if (!searchQuery.value.trim()) {
      return adminMenuitemsRows.value;
    }
    const query = searchQuery.value.toLowerCase();
    return adminMenuitemsRows.value.filter(
      (item) =>
        item.dishName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.price.toLowerCase().includes(query) ||
        item.uuid.toLowerCase().includes(query)
    );
  });

  function setActiveTab(tab: string) {
    activeTab.value = tab;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  function ViewCategory(row: any) {
    console.log(row);
  }

  function addCategory(payload: any) {
    const formData = {
      uuid: Math.random().toString(36).substring(2, 10),
      companyName: "Test Company",
      description: payload.description,
      status: false,
    };
    adminCategoriesRows.value.push(formData);
    // Notification removed - will be handled in Admin.vue after modal confirmation
  }

  return {
    tabs,
    activeTab,
    buttonText,
    searchQuery,
    adminCategoriesRows,
    adminMenuitemsRows,
    filteredCategories,
    filteredMenuItems,
    setActiveTab,
    setSearchQuery,
    addCategory,
    ViewCategory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot));
}
