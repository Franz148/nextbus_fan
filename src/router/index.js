import Vue from "vue";
import VueRouter from "vue-router";

//Pagine collegate
import Pianifica from "../views/Pianifica.vue";
import Viaggio from "../views/Viaggio.vue";

import Linee from "../views/Linee.vue";
import Preferiti from "../views/Preferiti.vue";
import Tariffe from "../views/Tariffe.vue";
import Accesso from "../views/Accesso.vue";

//fermata singola prova
//import FermataSingola from "../views/FermataSingola.vue";

//linea singola prova
import LineaSingola from "../views/LineaSingola.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/pianifica",
        component: Pianifica,
        children: [
            { path: "viaggio", component: Viaggio }
        ]
    },
    { path: "/", redirect: "/pianifica" },
    { path: "/linee", component: Linee },
    { path: "/preferiti", component: Preferiti },
    { path: "/tariffe", component: Tariffe },
    { path: "/lineaSingola/:id", component: LineaSingola },
    { path: "/accesso", component: Accesso }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;