# Generic Modal Components

This directory contains reusable modal components that can be used throughout the application.

## Available Modals

### BaseModal
The foundation modal component that provides the basic modal structure.

```vue
<BaseModal title="My Modal" @close="closeModal">
  <p>Modal content goes here</p>
</BaseModal>
```

### CategoryModal
Specialized modal for adding/editing categories.

```vue
<CategoryModal
  :is-edit="false"
  :initial-data="{ title: '', description: '' }"
  @close="closeModal"
  @submit="handleSubmit"
/>
```

### MenuItemModal
Specialized modal for adding/editing menu items.

```vue
<MenuItemModal
  :initial-data="menuItemData"
  @close="closeModal"
  @submit="handleSubmit"
/>
```

### ConfirmDeleteModal
Generic confirmation modal for delete operations.

```vue
<ConfirmDeleteModal
  :item-name="itemToDelete.name"
  @close="closeModal"
  @confirm="confirmDelete"
/>
```

### FormModal
Generic form modal that can be configured with different fields.

```vue
<FormModal
  title="Add User"
  :fields="[
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ]}
  ]"
  :initial-data="userData"
  submit-text="Add User"
  @close="closeModal"
  @submit="handleSubmit"
/>
```

### InfoModal
Simple modal for displaying information or alerts.

```vue
<InfoModal
  title="Success"
  message="Operation completed successfully!"
  button-text="OK"
  @close="closeModal"
/>
```

## Usage in Components

```vue
<template>
  <div>
    <!-- Your component content -->
    
    <!-- Use modals conditionally -->
    <CategoryModal
      v-if="showCategoryModal"
      :is-edit="isEditing"
      :initial-data="categoryData"
      @close="showCategoryModal = false"
      @submit="handleCategorySubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CategoryModal } from '@/components/modals';

const showCategoryModal = ref(false);
const isEditing = ref(false);
const categoryData = ref({ title: '', description: '' });

const handleCategorySubmit = (data) => {
  // Handle form submission
  console.log('Category data:', data);
  showCategoryModal.value = false;
};
</script>
```

## Benefits

1. **Reusability**: Use the same modal components across different parts of the application
2. **Consistency**: Maintain consistent UI/UX across all modals
3. **Maintainability**: Update modal styles and behavior in one place
4. **Flexibility**: Generic components like FormModal can be configured for different use cases
5. **Type Safety**: TypeScript interfaces ensure proper prop usage