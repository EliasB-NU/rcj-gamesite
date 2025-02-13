import { createRouter, createWebHistory } from 'vue-router'
import RefereeSite from "@/views/RefereeSite.vue";
import GameSite from "@/views/GameSite.vue";
import StandingsSite from "@/views/StandingsSite.vue";

const  routes = [
  {
    path: '/referee',
    name: 'RefereePlan',
    component: RefereeSite,
  },
  {
    path: '/games',
    name: 'Games',
    component: GameSite,
  },
  {
    path: '/standings',
    name: 'Standings',
    component: StandingsSite,
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
