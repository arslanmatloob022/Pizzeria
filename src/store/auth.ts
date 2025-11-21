import { defineStore } from "pinia";
import type { User } from "@/lib/Interfaces";
import { mediaData } from "@/lib/mediaData";
import {
  LayoutGrid,
  User as UserIcon,
  ShoppingCart,
  LucidePizza,
  BookCopy,
  CircleUser,
} from "lucide-vue-next";
import { useNotifyStore } from "./notify";

const users: User[] = [
  {
    email: "superadmin@yopmail.com",
    password: "super123",
    role: "superadmin",
    name: "Super Admin",
    image: mediaData.user,
  },
  {
    email: "admin@yopmail.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    image: mediaData.user,
  },
  {
    email: "user@yopmail.com",
    password: "user123",
    role: "user",
    name: "Regular User",
    image: mediaData.user,
  },
];

export const useAuthStore = defineStore("authStore", () => {
  const notificationStore = useNotifyStore();
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const restoreUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  const authenticateUser = (email: string, password: string): User | null => {
    return (
      users.find((u) => u.email === email && u.password === password) || null
    );
  };

  const login = (email: string, password: string) => {
    const foundUser = authenticateUser(email, password);
    if (foundUser) {
      user.value = foundUser;
      localStorage.setItem("token", "authenticated");
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("userRole", foundUser.role);
      notificationStore.notify.success(
        `Login successful welcome back ${foundUser.name}`
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  };

  const getMenuItemsByRole = (role: string) => {
    switch (role) {
      case "superadmin":
        return [{ path: "/dashboard", label: "Dashboard", icon: LayoutGrid }];
      case "admin":
        return [
          {
            path: "/dashboard/menu-management",
            label: "Menu Management",
            icon: LucidePizza,
          },
          {
            path: "/dashboard/order-management",
            label: "Order Management",
            icon: BookCopy,
          },
          {
            path: "/dashboard/profile",
            label: "Profile",
            icon: CircleUser,
          },
        ];
      case "user":
        return [
          { path: "/user", label: "Dashboard", icon: LayoutGrid },
          { path: "/profile", label: "My Profile", icon: UserIcon },
          { path: "/orders", label: "My Orders", icon: ShoppingCart },
        ];
      default:
        return [{ path: "/dashboard", label: "Dashboard", icon: LayoutGrid }];
    }
  };

  const updateProfile = (name: string, email: string) => {
    if (user.value) {
      user.value.name = name;
      user.value.email = email;
      localStorage.setItem("user", JSON.stringify(user.value));
      const userIndex = users.findIndex((u) => u.email === user.value?.email);
      if (userIndex !== -1) {
        users[userIndex]!!.name = name;
        users[userIndex]!!.email = email;
      }
      return true;
    }
    return false;
  };

  const updatePassword = (currentPassword: string, newPassword: string) => {
    if (user.value && user.value.password === currentPassword) {
      user.value.password = newPassword;
      localStorage.setItem("user", JSON.stringify(user.value));
      const userIndex = users.findIndex((u) => u.email === user.value?.email);
      if (userIndex !== -1) {
        users[userIndex]!!.password = newPassword;
      }
      return true;
    }
    return false;
  };

  restoreUser();

  return {
    user,
    isAuthenticated,
    login,
    logout,
    getMenuItemsByRole,
    updateProfile,
    updatePassword,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
