<script setup>
const props = defineProps([
  'title',
  'mode',
]);
</script>

<template>
  <!-- Header Section -->
  <header class="header">
    <div class="header-title">RoboCup Junior | {{ mode }} | {{ title }}</div>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 2000px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
}

.header-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}
</style>
