export default {
    login(username) {
        let newUser = username.charAt(0).toUpperCase() + username.slice(1);
        localStorage.setItem("username", newUser);
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