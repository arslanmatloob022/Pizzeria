import { defineStore, acceptHMRUpdate } from "pinia";
import type { Restaurant } from "@/lib/Interfaces";
import { useNotifyStore } from "@/store/notify";

export const useResturantStore = defineStore("resturantStore", () => {
  const addResturantModal = ref(false);
  const deleteResturantModal = ref(false);

  const editMode = ref(false);
  const editingRestaurant = ref<Restaurant | null>(null);
  const notifyStore = useNotifyStore();
  const deletedRestaurantId = ref("");
  const resturantsData = ref<Restaurant[]>([
    {
      uuid: "#32156",
      restaurantName: "Zazzo Pizza Co",
      phoneNo: "(843) 461-5941",
      address: "Apt 4B, The Grandview",
      squareAccountStatus: "Connected",
      status: true,
    },
    {
      uuid: "#32157",
      restaurantName: "The Daily Grind",
      phoneNo: "(212) 555-0182",
      address: "145 Bleecker St",
      squareAccountStatus: "Pending",
      status: false,
    },
    {
      uuid: "#32162",
      restaurantName: "The Woven Thread",
      phoneNo: "(615) 555-0134",
      address: "Studio 9, The Artisan Lofts",
      squareAccountStatus: "Connected",
      status: false,
    },
    {
      uuid: "#32159",
      restaurantName: "Innovatech Soluti",
      phoneNo: "(415) 555-0199",
      address: "3rd Floor, 800 Market St",
      squareAccountStatus: "Error",
      status: true,
    },
    {
      uuid: "#32160",
      restaurantName: "Pawsitive Groomin",
      phoneNo: "(773) 555-0112",
      address: "456 Maple Avenue",
      squareAccountStatus: "Disconnected",
      status: true,
    },
    {
      uuid: "#32161",
      restaurantName: "QuickFix Bike Repair",
      phoneNo: "(512) 555-0178",
      address: "Unit 7, The Bike Path",
      squareAccountStatus: "Connected",
      status: true,
    },
    {
      uuid: "#32163",
      restaurantName: "Sunrise Bakery",
      phoneNo: "(206) 555-0161",
      address: "2121 Pike Place",
      squareAccountStatus: "Pending",
      status: false,
    },
    {
      uuid: "#32158",
      restaurantName: "Bloom & Stem Flori",
      phoneNo: "(310) 555-0145",
      address: "Suite 201, The Blossom Building",
      squareAccountStatus: "Connected",
      status: true,
    },
    {
      uuid: "#32164",
      restaurantName: "Quantum Queries",
      phoneNo: "(617) 555-0122",
      address: "PO Box 4501",
      squareAccountStatus: "Connected",
      status: true,
    },
  ]);

  function handleAddResturant() {
    editMode.value = false;
    editingRestaurant.value = null;
    addResturantModal.value = true;
  }

  function openDeleteModal(uuid: string) {
    deleteResturantModal.value = true;
    deletedRestaurantId.value = uuid;
  }

  function handleEditResturant(restaurant: Restaurant) {
    editMode.value = true;
    editingRestaurant.value = { ...restaurant };
    addResturantModal.value = true;
  }

  function handleformSubmit(formData: {
    name: string;
    address: string;
    phone: string;
  }) {
    if (editMode.value && editingRestaurant.value) {
      const index = resturantsData.value.findIndex(
        (r) => r.uuid === editingRestaurant.value!.uuid
      );
      if (index !== -1) {
        const existing = resturantsData.value[index];
        resturantsData.value[index] = {
          uuid: existing!!.uuid,
          restaurantName: formData.name,
          address: formData.address,
          phoneNo: formData.phone,
          squareAccountStatus: existing!!.squareAccountStatus,
          status: existing!!.status,
        };
        notifyStore.notify.success("Restaurant updated successfully!");
      }
    } else {
      // Add new restaurant
      const newRestaurant: Restaurant = {
        uuid: `#${Math.floor(Math.random() * 100000)}`,
        restaurantName: formData.name,
        phoneNo: formData.phone,
        address: formData.address,
        squareAccountStatus: "Pending",
        status: true,
      };
      resturantsData.value.unshift(newRestaurant);
      notifyStore.notify.success("Restaurant added successfully!");
    }
  }

  function updateRestaurantStatus(uuid: string, status: boolean) {
    console.log("ads");
    const restaurant = resturantsData.value.find((r) => r.uuid === uuid);
    if (restaurant) {
      restaurant.status = status;
      notifyStore.notify.success(
        `Restaurant ${status ? "enabled" : "disabled"} successfully!`
      );
    }
  }

  function deleteRestaurant() {
    const index = resturantsData.value.findIndex(
      (r) => r.uuid === deletedRestaurantId.value
    );
    if (index !== -1) {
      resturantsData.value.splice(index, 1);
      deletedRestaurantId.value = "";
      deleteResturantModal.value = false;
      notifyStore.notify.success("Restaurant deleted successfully!");
    }
  }

  return {
    addResturantModal,
    editMode,
    editingRestaurant,
    resturantsData,
    deleteResturantModal,
    deletedRestaurantId,
    handleAddResturant,
    openDeleteModal,
    handleEditResturant,
    handleformSubmit,
    updateRestaurantStatus,
    deleteRestaurant,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResturantStore, import.meta.hot));
}
