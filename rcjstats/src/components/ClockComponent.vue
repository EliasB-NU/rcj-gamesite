<script setup>
import { ref, onMounted, onUnmounted} from "vue";
import ClockComponent from "@/components/ClockComponent.vue";

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
  <div class="clock">
    <p>{{ time }}</p>
  </div>
</template>

<style scoped>
.clock {
  width: 100%;
  text-align: center;
  font-size: 14em;
  color: #333333;
}
</style>
