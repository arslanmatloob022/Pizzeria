<script setup lang="ts">
import type { TabsPropsinterface } from "@/lib/Interfaces";

const props = defineProps<{
  tabs: TabsPropsinterface[];
  activeTab: string;
}>();

const emit = defineEmits(["updateTab"]);
</script>

<template>
  <div class="flex items-center gap-0">
    <div v-for="item in props.tabs" :key="item.value">
      <div
        @click="emit('updateTab', item.value)"
        :class="[
          props.activeTab === item.value
            ? 'bg-black text-white '
            : 'bg-white text-black',
          'p-2 lg:p-4 flex items-center gap-2 cursor-pointer border-b border-lightText hover:border-lightText transition-all duration-300 ease-in-out ',
]"
      >
        <component
          :is="item.icon"
          class="w-5 h-5 transition-colors duration-300 ease-in-out"
        />

        <h2
          class="text-sm lg:text-base"
          :class="[
            props.activeTab === item.value
              ? 'text-white opacity-100 translate-y-0'
              : 'text-black opacity-70 translate-y-1',
            'transition-all duration-300 ease-in-out',
          ]"
        >
          {{ item.title }}
        </h2>
      </div>
    </div>
  </div>
</template>
