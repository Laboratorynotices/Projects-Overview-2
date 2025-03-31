<script setup lang="ts">
const props = defineProps<{
  text: String;
}>();
</script>

<template>
  <!-- Описание проекта -->
  <div class="px-8 py-4">
    <p>{{ props.text }}</p>
  </div>
</template>
