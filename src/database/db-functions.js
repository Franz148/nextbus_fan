import Firebase from "@firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVmCc7n4CmQwQ2srwxDzQL3tkBJ3sZhMI",
    authDomain: "db-test2020.firebaseapp.com",
    projectId: "db-test2020"
};

Firebase.initializeApp(firebaseConfig);

//var db = firebase.firestore();
//var collUser = db.collection("users");

export default {
    login(username) {
        localStorage.setItem("username", username);
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    isLoggedIn() {
        return !!localStorage.getItem("username");
    }
}