import { createRouter, createWebHashHistory } from 'vue-router'
import RefereeView from "@/views/RefereeView.vue";
import StandingsView from "@/views/StandingsView.vue";
import HomeView from "@/views/HomeView.vue";
import IntGameView from "@/views/IntGameView.vue";
import EtGameView from "@/views/EtGameView.vue";
import LwL1v1GameView from "@/views/LwL1v1GameView.vue";
import GameView from "@/views/GameView.vue";

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
    path: '/games/entry',
    name: 'Entry Games',
    component: EtGameView,
  },
  {
    path: '/games/lwl1v1',
    name: 'LwL 1v1 Games',
    component: LwL1v1GameView,
  },
  {
    path: '/games/2v2',
    name: '2v2 Games',
    component: IntGameView,
  },
  {
    path: '/games',
    name: 'All Games | Cycle',
    component: GameView,
  },
  {
    path: '/standings',
    name: 'Standings',
    component: StandingsView,
  },
];

const router  = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
