import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/gioi-thieu",
    name: "gioi-thieu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/dang-ky",
    name: "dang-ky",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/dang-nhap",
    name: "dang-nhap",
    component: () => import("../views/LoginView.vue"),
  },
  {

    path: '/san-pham/:id',
    component: () => import('../views/ProductView.vue')
  },

  {
    path: "/danh-muc-san-pham/:category",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/dang-nhap",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/gio-hang",
    component: () => import("../views/ProductsCartView.vue"),
  },
  {
    path: "/thanh-toan",
    component: () => import("../views/PayView.vue"),
  },
  {
    path: "/tim-kiem/:keyword",
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/tim-kiem",
    component: () => import("../views/SearchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
