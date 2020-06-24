import Vue from "vue";
import VueRouter from "vue-router";

//Pagine collegate
import Pianifica from "../views/Pianifica.vue";
import Linee from "../views/Linee.vue";
import Preferiti from "../views/Preferiti.vue";

//fermata singola prova
//import FermataSingola from "../views/FermataSingola.vue";

//linea singola prova
import LineaSingola from "../views/LineaSingola.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/pianifica", component: Pianifica },
    { path: "/", redirect: "/pianifica" },
    { path: "/linee", component: Linee },
    { path: "/preferiti", component: Preferiti },
    { path: "/lineaSingola/:id", component: LineaSingola }
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;