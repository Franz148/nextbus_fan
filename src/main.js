import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.min.css'

//FILE PER TEMA CUSTOM
import "./style/custom-theme.scss";

Vue.config.productionTip = false;

Vue.use(VueMaterial);

//GLOBAL CONFIGURATION
Vue.material.locale.dateFormat = "dd/MM/yyyy";
Vue.material.locale.firstDayOfAWeek = 1;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");