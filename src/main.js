import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.min.css'

//File per tema custom
import "./style/custom-theme.scss";

Vue.config.productionTip = false;

Vue.use(VueMaterial);

//Global configuration
Vue.material.locale.dateFormat = "MM/dd/yyyy";
Vue.material.locale.firstDayOfAWeek = 1;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");