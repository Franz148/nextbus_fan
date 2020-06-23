export default {
    login(username) {
        localStorage.setItem("username", username);
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    isLoggedIn() {
        return !!localStorage.getItem("username");
    },

    logout() {
        localStorage.removeItem("username");
    }
}