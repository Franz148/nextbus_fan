import Vue from "vue";
import VueRouter from "vue-router";

//LISTA PAGINE
import Accesso from "../views/Accesso.vue";
import Pianifica from "../views/Pianifica.vue";
import Viaggio from "../views/Viaggio.vue";
import Linee from "../views/Linee.vue";
import Tariffe from "../views/Tariffe.vue";
import LineaSingola from "../views/LineaSingola.vue";
import Preferiti from "../views/Preferiti.vue";

Vue.use(VueRouter);

//CREAZIONE ROUTES
const routes = [
    { path: "/", redirect: "/pianifica" },

    //Pianifica.vue con Viaggio.vue come NESTED ROUTE 
    {
        path: "/pianifica",
        component: Pianifica,
        children: [
            { path: "viaggio", component: Viaggio }
        ]
    },
    { path: "/linee", component: Linee },
    { path: "/preferiti", component: Preferiti },
    { path: "/tariffe", component: Tariffe },
    { path: "/lineaSingola/:id", component: LineaSingola },
    { path: "/accesso", component: Accesso }
];

//INIZIALIZZAZIONE VUE ROUTER
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;