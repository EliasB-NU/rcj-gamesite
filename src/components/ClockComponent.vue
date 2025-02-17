<script setup>
import { ref, onMounted, onUnmounted} from "vue";

const time = ref(new Date().toLocaleTimeString());

const updateClock = () => {
  time.value = new Date().toLocaleTimeString();
};

let interval;

onMounted(() => {
  interval = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div>
    <p>{{ time }}</p>
  </div>
</template>

<style scoped>
</style>
