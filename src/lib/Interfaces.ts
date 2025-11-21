import type { Component } from "vue";

export interface BreadCrumb {
  label: string;
  url: string;
}

export interface User {
  email: string;
  password: string;
  role: "superadmin" | "admin" | "user";
  name: string;
  image?: string;
}

export interface Restaurant {
  uuid: string;
  restaurantName: string;
  phoneNo: string;
  address: string;
  squareAccountStatus: string;
  status: boolean;
}

export interface TabsPropsinterface {
  id: number;
  title: string;
  value: string;
  icon: Component;
}

export interface MenuItem {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  video: string;
  subtitle: string;
  description: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
