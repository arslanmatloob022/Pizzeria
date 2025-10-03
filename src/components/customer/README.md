# Customer Menu System

This directory contains the customer-facing components for the pizzeria ordering system.

## Components

### MenuPage.vue
- Main landing page for customers
- Displays menu items by category
- Add to cart functionality
- Responsive grid layout

### CartPage.vue
- Shopping cart management
- Quantity adjustment
- Remove items
- Price calculations with tax
- Checkout navigation

### CheckoutPage.vue
- Order form with delivery/pickup options
- Personal information collection
- Payment method selection (COD/Card)
- Order summary display

### OrderConfirmation.vue
- Order confirmation with animated pizza
- Order details display
- Payment status
- Back to menu navigation

## Usage

```vue
<template>
  <div>
    <!-- For customer menu flow -->
    <MenuPage />
    <CartPage />
    <CheckoutPage />
    <OrderConfirmation />
  </div>
</template>

<script setup>
import { MenuPage, CartPage, CheckoutPage, OrderConfirmation } from '@/components/customer';
</script>
```

## Cart Store

The cart functionality uses a composable store:

```typescript
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();

// Add item to cart
cart.addItem({
  id: 1,
  name: 'Pizza',
  price: '26.90',
  image: 'pizza.jpg'
});

// Access cart data
console.log(cart.cartCount.value); // Total items
console.log(cart.grandTotal.value); // Total price
```

## Features

- Dark theme UI matching the design
- Responsive layout
- Cart state management
- Form validation
- Order flow navigation
- Animated confirmations