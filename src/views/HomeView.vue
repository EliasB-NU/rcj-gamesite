<script setup>

import Header from "@/components/Header.vue";
import config from "@/config.js";
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header title="RCJ Stats" mode="Home" />
  <div class="page-container-projects">
    <div class="projects-grid">
      <div class="project-container" v-on:click="$router.push('standings')">
        <div class="project-box">
          <h2>Standings</h2>
          <p>View league standings</p>
        </div>
      </div>
      <div class="project-container" v-on:click="$router.push('games')">
        <div class="project-box">
          <h2>Games</h2>
          <p>View the games and their results</p>
        </div>
      </div>
      <div class="project-container" v-if="config.displayRescue">
        <div class="project-box">
          <h2>Rescue</h2>
          <a v-bind:href="config.rescueURL">Rescue</a>
        </div>
      </div>
      <div class="project-container" v-on:click="$router.push('games/entry')">
        <div class="project-box">
          <h2>Games -  Entry</h2>
          <p>View the games and their results</p>
        </div>
      </div>
      <div class="project-container" v-on:click="$router.push('games/lwl1v1')">
        <div class="project-box">
          <h2>Games - Lightweight Entry</h2>
          <p>View the games and their results</p>
        </div>
      </div>
      <div class="project-container" v-on:click="$router.push('games/2v2')">
        <div class="project-box">
          <h2>Games - 2v2</h2>
          <p>View the games and their results</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.page-container-projects {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fa;
  padding: 20px;
  box-sizing: border-box;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.project-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  margin-bottom: 15px;
}

.project-container {
  display: flex;
  justify-content: center;
}

.project-container:hover {
  cursor: pointer;
}
</style>
