import Vue from "vue";
import VueRouter from "vue-router";

//Pagine collegate
import Pianifica from "../views/Pianifica.vue";
import Fermate from "../views/Fermate.vue";
import Linee from "../views/Linee.vue";
import Preferiti from "../views/Preferiti.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/pianifica", component: Pianifica },
    { path: "/", redirect: "/pianifica" },
    { path: "/fermate", component: Fermate },
    { path: "/linee", component: Linee },
    { path: "/preferiti", component: Preferiti }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;