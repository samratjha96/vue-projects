import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/views/Welcome.vue";
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next({ name: "Chatroom" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "chatroom" */ "../views/Chatroom.vue"),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
