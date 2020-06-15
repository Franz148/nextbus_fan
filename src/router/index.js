import Vue from "vue";
import VueRouter from "vue-router";
import Preferiti from "../views/Preferiti.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", redirect: "/pianifica" },
    { path: "/preferiti", component: Preferiti }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;