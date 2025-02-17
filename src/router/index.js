import { createRouter, createWebHistory } from 'vue-router'
import RefereeView from "@/views/RefereeView.vue";
import StandingsView from "@/views/StandingsView.vue";
import HomeView from "@/views/HomeView.vue";
import IntGameView from "@/views/IntGameView.vue";
import EtGameView from "@/views/EtGameView.vue";

const  routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/referee',
    name: 'RefereePlan',
    component: RefereeView,
  },
  {
    path: '/games/1v1',
    name: '1v1 Games',
    component: EtGameView,
  },
  {
    path: '/games/2v2',
    name: '2v2 Games',
    component: IntGameView,
  },
  {
    path: '/standings',
    name: 'Standings',
    component: StandingsView,
  },
];

const router  = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to ) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router
